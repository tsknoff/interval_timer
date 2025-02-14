// ActivityGrid.tsx
import { FC, useMemo } from "react";
import { JournalRecord } from "../App.tsx";
import { duration } from "@mui/material";

interface IActivityGridProps {
  journalRecords: JournalRecord[];
}

function formatMs(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}m ${sec}s`;
}

type DayInfo = {
  date: Date;
  isoKey: string; // "YYYY-MM-DD"
  count: number; // сколько тренировок
  records: JournalRecord[]; // сами записи (чтобы вывести список в tooltip)
};

export const ActivityGrid: FC<IActivityGridProps> = ({ journalRecords }) => {
  // --- 1. Подготовка словаря dateKey => массив JournalRecord ---

  // Для каждой записи определим "YYYY-MM-DD", чтобы сгруппировать
  const recordsByDay = useMemo(() => {
    const map: Record<string, JournalRecord[]> = {};
    journalRecords.forEach((rec) => {
      // Пример входящей даты: "13.02.2025, 16:48:34"
      // Извлекаем только день, месяц, год
      const [datePart] = rec.date.split(","); // "13.02.2025"
      const [dayStr, monthStr, yearStr] = datePart.split(".");
      const isoKey = `${yearStr}-${monthStr}-${dayStr}`; // "2025-02-13"
      if (!map[isoKey]) {
        map[isoKey] = [];
      }
      map[isoKey].push(rec);
    });
    return map;
  }, [journalRecords]);

  // --- 2. Генерация списка дат за нужный период (например, 1 год) ---
  const today = new Date();
  const startDate = new Date(today);
  startDate.setFullYear(startDate.getFullYear() - 1); // год назад

  // Собираем все дни (Date) от startDate до today
  const allDates: Date[] = [];
  let cur = new Date(startDate);
  // Пройдёмся по дням, пока не превысим today
  while (cur <= today) {
    allDates.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }

  // --- 3. Сформируем структуру "недель" (GitHub-стиль) ---
  // GitHub строит сетку, где по горизонтали — недели, по вертикали — дни недели (всего 7 строк).
  // При этом "первая" колонка - самый старый день, "последняя" - новый. (или наоборот, но GitHub идёт слева-направо)
  // Нужно определить, какой день недели у startDate (чтобы выровнять).

  // Упрощённо: мы возьмём allDates[0] как "первую клетку" в столбце, где dayOfWeek=allDates[0].getDay().
  // (Учтём, что getDay() в JS: 0=воскресенье, 1=понедельник, ...6=суббота. Для GitHub обычно "Mon"=0.)
  // Для наглядности подменим немного логику, чтобы понедельник был = 0, ... воскресенье = 6.

  function getDayOfWeek(d: Date): number {
    // JS getDay(): 0=Sunday, 1=Monday,...,6=Saturday
    // хотим: 0=Monday, 6=Sunday
    let wd = d.getDay(); // 0..6
    if (wd === 0) wd = 7; // Sunday
    return wd - 1; // теперь Пн=0,...,Вс=6
  }

  // создаём массив недель (каждый элемент — это 7 ячеек (DayInfo))
  // но сначала нам нужно "подвинуть" даты так, чтобы первая неделя началась с понедельника.
  // Если первый день (startDate) приходится на среду, мы добавим пустые слоты (в реальном GitHub так делается).
  // Но можно упростить, если не нужна точная "красивая" отрисовка. Покажем всё подряд.

  // Создадим массив DayInfo для всех дат
  const dayInfos: DayInfo[] = allDates.map((dateObj) => {
    const isoKey = formatDate(dateObj);
    const recs = recordsByDay[isoKey] || [];
    return {
      date: dateObj,
      isoKey,
      count: recs.length,
      records: recs,
    };
  });

  // Теперь разобьём на недели (каждая неделя — 7 позиций (дни), индекс по dayOfWeek)
  // Но GitHub формирует столбцы = недели (т.е. каждый столбец ~ 1 неделю),
  // а строки = дни (0..6). Пойдём column-major order.

  // Определим, сколько "столбцов" получится (примерно (количество дней + offset) / 7).
  // Чтобы правильно сдвигать первую неделю, делаем offset = getDayOfWeek(dayInfos[0].date).
  const firstDayOffset = getDayOfWeek(dayInfos[0].date); // 0..6
  // Добавим "пустые" слоты (для понедельника?)
  const blankDays: DayInfo[] = [];
  for (let i = 0; i < firstDayOffset; i++) {
    blankDays.push({
      date: new Date(0), // фиктивное
      isoKey: `blank-${i}`,
      count: 0,
      records: [],
    });
  }
  const fullDayInfos = [...blankDays, ...dayInfos];

  // теперь fullDayInfos.length % 7 даёт, сколько слотов в последнем неполном столбце
  // будем итерировать по столбцам (неделям)
  const totalCols = Math.ceil(fullDayInfos.length / 7);

  // Сформируем структуру: weeks[colIndex][rowIndex], где rowIndex = dayOfWeek(0..6)
  const weeks: DayInfo[][] = [];
  for (let c = 0; c < totalCols; c++) {
    const colSlice = fullDayInfos.slice(c * 7, c * 7 + 7);
    weeks.push(colSlice);
  }

  // --- 4. Для day-of-week label и month label ---

  // День недели: массив коротких названий (пон, вт, ср...)
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Функция для получения короткого имени месяца
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Когда GitHub рисует «Oct», «Nov» над столбиками:
  // он смотрит на первую дату в каждом столбце, и если месяц там сменился
  // (или если это первая колонка в наборе), то рисует метку.
  function getMonthLabel(
    dayInfo: DayInfo,
    prevDayInfo?: DayInfo,
  ): string | null {
    if (!dayInfo || dayInfo.isoKey.startsWith("blank")) return null;
    const m = dayInfo.date.getMonth(); // 0..11
    if (!prevDayInfo || prevDayInfo.isoKey.startsWith("blank")) {
      // первая колонка
      return monthNames[m];
    }
    const pm = prevDayInfo.date.getMonth();
    if (m !== pm) {
      return monthNames[m];
    }
    return null;
  }

  function getColor(count: number) {
    if (count === 0)
      return "#161B22"; // 0  (очень тёмный/серый)
    else if (count === 1)
      return "#ecf8d3"; // 1
    else if (count === 2)
      return "#d4f1b7"; // 2
    else if (count === 3)
      return "#b8e48b"; // 3  (похож на #c6e48b, но чуть светлее/темнее)
    else if (count === 4)
      return "#9cd873"; // 4
    else if (count === 5)
      return "#7bc96f"; // 5
    else if (count === 6)
      return "#42ba60"; // 6
    else if (count === 7)
      return "#239a3b"; // 7
    else return "#196127"; // 8 и больше
  }

  // --- 6. Построение UI ---

  // Рендерим:
  //  - слева отдельную колонку с надписями Mon, Wed, Fri (например, можно не все, а через 2)
  //  - сверху над каждым столбцом (week) — подпись месяца, если нужно
  //  - под каждым столбцом (или нигде) — года, если нужно

  return (
    <div
      style={{
        display: "flex",
        color: "white",
      }}
    >
      {/* Колонка с подписями дней (7 штук) */}
      <div style={{ marginRight: 8, marginTop: 18 }}>
        {dayLabels.map((label, idx) => (
          <div
            key={label}
            style={{
              height: 14, // совпадает с квадратиком + margin (14+2?)
              marginBottom: 2,
              fontSize: 10,
              textAlign: "right",
            }}
          >
            {/* Можно не все дни подписывать, а например только Mon, Wed, Fri */}
            {/* if (idx===0 || idx===2 || idx===4) {label} */}
            {/*{label}*/}
            {idx % 2 === 0 && label}
          </div>
        ))}
      </div>

      {/* Сетка недель */}
      <div style={{ display: "flex", fontFamily: "sans-serif" }}>
        {weeks.map((col, colIndex) => {
          // месяц для подписи
          const firstDayInCol = col[0];
          const prevColLastDay = weeks[colIndex - 1]?.[0];
          const monthLabel = getMonthLabel(firstDayInCol, prevColLastDay);

          return (
            <div
              key={colIndex}
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: 4,
              }}
            >
              {/* Отображаем название месяца (если оно есть) */}
              <div style={{ height: 10, marginBottom: 8 }}>
                {monthLabel && (
                  <span style={{ fontSize: 10 }}>{monthLabel}</span>
                )}
              </div>

              {col.map((dayInfo, rowIndex) => {
                // tooltip: если dayInfo.records.length>0, перечислить их
                let tooltip = "";
                if (
                  !dayInfo.isoKey.startsWith("blank") &&
                  dayInfo.records.length > 0
                ) {
                  const lines = dayInfo.records.map((r, i) => {
                    const shortComment = r.comment
                      ? ` - ${r.comment.slice(0, 30)}...`
                      : "";
                    return `${i + 1}) ${r.technique} ${r.pattern}${shortComment}`;
                  });

                  const summaryDuration = dayInfo.records.reduce(
                    (acc, rec) => acc + rec.duration,
                    0,
                  );

                  const formattedDuration = formatMs(summaryDuration);

                  tooltip = `${dayInfo.isoKey}\n${lines.join("\n")}\nTotal duration: ${formattedDuration} ms`;
                } else if (!dayInfo.isoKey.startsWith("blank")) {
                  tooltip = `${dayInfo.isoKey}\n(no trainings)`;
                }

                return (
                  <div
                    key={rowIndex}
                    title={tooltip}
                    style={{
                      width: 14,
                      height: 14,
                      marginBottom: 2,
                      backgroundColor: dayInfo.isoKey.startsWith("blank")
                        ? "transparent"
                        : getColor(dayInfo.count),
                      borderRadius: 2,
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Вспомогательная функция
function formatDate(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

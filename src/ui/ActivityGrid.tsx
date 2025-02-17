// ActivityGrid.tsx

import { FC, ReactNode, useEffect, useMemo } from "react";
import { JournalRecord } from "../App.tsx";
import { Box, Tooltip } from "@mui/material";

interface IActivityGridProps {
  journalRecords: JournalRecord[];
}

/** Утилита: форматируем миллисекунды (duration) в "Xm Ys" */
function formatMs(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}m ${sec}s`;
}

/** Преобразуем строку "13.02.2025, 16:48:34" в объект Date. */
function parseRecordDate(dateStr: string): Date | null {
  try {
    const [datePart, timePart] = dateStr.split(",");
    if (!datePart || !timePart) return null;

    const [dayStr, monthStr, yearStr] = datePart.split(".");
    const [hhStr, mmStr, ssStr] = timePart.split(":");

    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10) - 1; // JS Date: 0..11
    const year = parseInt(yearStr, 10);

    const hour = parseInt(hhStr, 10);
    const min = parseInt(mmStr, 10);
    const sec = parseInt(ssStr, 10);

    const d = new Date(year, month, day, hour, min, sec);
    if (isNaN(d.getTime())) return null;
    return d;
  } catch {
    return null;
  }
}

/** Тип для внутренней структуры дня */
type DayInfo = {
  date: Date;
  isoKey: string;
  count: number;
  records: JournalRecord[];
};

// 8-ступенчатая шкала
export const getColor = (count: number) => {
  if (count === 0) return "#161B22";
  if (count === 1) return "#ecf8d3";
  if (count === 2) return "#d4f1b7";
  if (count === 3) return "#b8e48b";
  if (count === 4) return "#9cd873";
  if (count === 5) return "#7bc96f";
  if (count === 6) return "#42ba60";
  if (count === 7) return "#239a3b";
  return "#196127"; // 8+
};

export const ActivityGrid: FC<IActivityGridProps> = ({ journalRecords }) => {
  // --- 1. Сгруппировать записи по "YYYY-MM-DD" ---
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const recordsByDay = useMemo(() => {
    const map: Record<string, JournalRecord[]> = {};
    journalRecords.forEach((rec) => {
      // Пример: "13.02.2025, 16:48:34"
      const [datePart] = rec.date.split(",");
      if (!datePart) return;
      const [dayStr, monthStr, yearStr] = datePart.split(".");
      if (!yearStr) return;
      const isoKey = `${yearStr}-${monthStr}-${dayStr}`; // "2025-02-13"

      if (!map[isoKey]) {
        map[isoKey] = [];
      }
      map[isoKey].push(rec);
    });
    return map;
  }, [journalRecords]);

  // --- 2. Генерируем даты за год ---
  const today = new Date();
  const startDate = new Date(today);
  startDate.setFullYear(startDate.getFullYear() - 1);

  const allDates: Date[] = [];
  const cur = new Date(startDate);
  while (cur <= today) {
    allDates.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }

  // --- 3. Превращаем в DayInfo ---
  function formatDate(d: Date) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

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

  // Смещение первой недели, чтобы понедельник=0, вторник=1, ...
  function getDayOfWeek(d: Date): number {
    let wd = d.getDay(); // 0..6, 0=Sunday
    if (wd === 0) wd = 7;
    return wd - 1; // Monday=0..Sunday=6
  }

  const firstDayOffset = getDayOfWeek(dayInfos[0].date);
  const blankDays: DayInfo[] = [];
  for (let i = 0; i < firstDayOffset; i++) {
    blankDays.push({
      date: new Date(0),
      isoKey: `blank-${i}`,
      count: 0,
      records: [],
    });
  }
  const fullDayInfos = [...blankDays, ...dayInfos];
  const totalCols = Math.ceil(fullDayInfos.length / 7);

  const weeks: DayInfo[][] = [];
  for (let c = 0; c < totalCols; c++) {
    weeks.push(fullDayInfos.slice(c * 7, c * 7 + 7));
  }

  // Дни недели, месяца
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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

  function getMonthLabel(
    dayInfo: DayInfo,
    prevDayInfo?: DayInfo,
  ): string | null {
    if (!dayInfo || dayInfo.isoKey.startsWith("blank")) return null;
    const m = dayInfo.date.getMonth();
    if (!prevDayInfo || prevDayInfo.isoKey.startsWith("blank")) {
      return monthNames[m];
    }
    const pm = prevDayInfo.date.getMonth();
    if (m !== pm) {
      return monthNames[m];
    }
    return null;
  }

  // При первом рендере прокручиваем вправо, чтобы видеть "свежие" дни
  useEffect(() => {
    const grid = document.getElementById("activity-grid");
    if (grid) {
      grid.scrollLeft = grid.scrollWidth;
    }
  }, []);

  return (
    <Box
      id="activity-grid"
      style={{
        // width: "100%",
        // minWidth: "100px",
        overflow: "auto",
        // border: "1px solid #ccc",
        padding: 16,
        borderRadius: 4,
      }}
    >
      <div
        style={{
          display: "flex",
          color: "white",
          // width: "400px",
        }}
      >
        {/* Левая колонка с метками (Mon, Tue...) */}
        <div style={{ marginRight: 8, marginTop: 18 }}>
          {dayLabels.map((label, idx) => (
            <div
              key={label}
              style={{
                height: 14,
                marginBottom: 2,
                fontSize: 10,
                textAlign: "right",
                fontFamily: "sans-serif",
              }}
            >
              {idx % 2 === 0 && label}
            </div>
          ))}
        </div>

        {/* Сетка недель */}
        <div style={{ display: "flex", fontFamily: "sans-serif" }}>
          {weeks.map((col, colIndex) => {
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
                {/* Подпись месяца */}
                <div style={{ height: 10, marginBottom: 8 }}>
                  {monthLabel && (
                    <span style={{ fontSize: 10 }}>{monthLabel}</span>
                  )}
                </div>

                {col.map((dayInfo, rowIndex) => {
                  // Если ячейка не "blank" и содержит записи
                  // сортируем их по времени (самые ранние — сверху)
                  // Для этого parseRecordDate, потом .sort((a,b)=...)
                  let lines: string[] = [];
                  if (
                    !dayInfo.isoKey.startsWith("blank") &&
                    dayInfo.records.length > 0
                  ) {
                    const sortedRecs = [...dayInfo.records].sort((a, b) => {
                      // parse date
                      const da = parseRecordDate(a.date);
                      const db = parseRecordDate(b.date);
                      if (!da || !db) return 0;
                      return da.getTime() - db.getTime(); // ascending
                    });

                    lines = sortedRecs.map((rec) => {
                      const d = parseRecordDate(rec.date);
                      let timeStr = "";
                      if (d) {
                        const hh = String(d.getHours()).padStart(2, "0");
                        const mm = String(d.getMinutes()).padStart(2, "0");
                        timeStr = `${hh}:${mm} `;
                      }

                      const shortComment = rec.comment
                        ? ` - ${rec.comment.slice(0, 30)}...`
                        : "";
                      return `${timeStr}${rec.technique} ${rec.pattern}${shortComment}`;
                    });
                  }

                  // Суммарная длительность по всем записям
                  let summaryDuration = 0;
                  if (dayInfo.records.length > 0) {
                    summaryDuration = dayInfo.records.reduce(
                      (acc, rec) => acc + rec.duration,
                      0,
                    );
                  }

                  // Формируем содержимое тултипа
                  // Можно вернуть элемент <Box> или <div>
                  let tooltipContent: ReactNode = null;
                  if (!dayInfo.isoKey.startsWith("blank")) {
                    if (lines.length > 0) {
                      tooltipContent = (
                        <div style={{ whiteSpace: "pre-line" }}>
                          <div>{dayInfo.isoKey}</div>
                          <div>Total duration: {formatMs(summaryDuration)}</div>
                          {lines.map((line, idx2) => (
                            <div key={idx2}>{line}</div>
                          ))}
                        </div>
                      );
                    } else {
                      tooltipContent = (
                        <div>
                          {dayInfo.isoKey}
                          <div>(no trainings)</div>
                        </div>
                      );
                    }
                  }

                  // Сам квадратик
                  return (
                    <Tooltip
                      key={rowIndex}
                      title={tooltipContent || ""}
                      arrow
                      disableInteractive
                    >
                      <div
                        style={{
                          width: 14,
                          height: 14,
                          marginBottom: 2,
                          backgroundColor: dayInfo.isoKey.startsWith("blank")
                            ? "transparent"
                            : getColor(dayInfo.count),
                          borderRadius: 2,
                          cursor: dayInfo.count > 0 ? "pointer" : "default",
                        }}
                      />
                    </Tooltip>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Box>
  );
};

import { FC } from "react";
import { Box } from "@mui/material";
import { JournalNote } from "./JournalNote.tsx";
import { JournalRecord } from "../App.tsx";
import EventNoteIcon from "@mui/icons-material/EventNote";

interface IJournalList {
  journal: JournalRecord[];
}

const getDayLabel = (dateStr: string): string => {
  // Предположим, что dateStr — это что-то типа "2023-09-15, 16:00:00"
  // или локальный формат "15.09.2023, 16:00:00".
  // Нужно распарсить и получить объект Date.

  // Пример упрощённого парсинга (если у вас локальный формат "DD.MM.YYYY, HH:MM:SS"):
  const [dmyPart] = dateStr.split(","); // "15.09.2023"
  const [dayStr, monthStr, yearStr] = dmyPart.trim().split(".");
  const dayNum = parseInt(dayStr, 10);
  const monthNum = parseInt(monthStr, 10) - 1; // JS Date: 0..11
  const yearNum = parseInt(yearStr, 10);
  const dateObj = new Date(yearNum, monthNum, dayNum);

  const now = new Date();
  // Нормализуем "сегодня, вчера, на неделе"
  // Сначала сделаем полночь для каждого
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const diffMs = startOfToday.getTime() - dateObj.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    // На этой неделе — показываем день недели
    // (0=Sunday,...6=Saturday, но у нас может быть 0=понедельник).
    // Чтобы сделать «понедельник, вторник...» по-русски, массив:
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const weekday = dateObj.getDay(); // 0..6
    return dayNames[weekday];
  } else {
    // Старше недели — формат "DD MMM"
    // Месяцы по-русски
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
    const mm = monthNames[dateObj.getMonth()];
    const dd = dateObj.getDate();
    return `${dd} ${mm}`;
  }
};

export const JournalList: FC<IJournalList> = ({ journal }) => {
  return (
    <Box
      style={{
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "sans-serif",
        border: "1px solid white",
        borderRadius: 16,
        height: "calc(100vh - 10rem)",
        overflowY: "scroll",
        gap: 10,
      }}
    >
      <Box
        style={{
          alignContent: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "#023385",
          width: "100%",
          fontFamily: "sans-serif",
          color: "white",
          position: "sticky",
          top: 0,
          gap: 8,
          zIndex: 1,
        }}
      >
        <EventNoteIcon
          style={{
            paddingLeft: 32,
          }}
        />
        <h2>Practice journal</h2>
      </Box>

      <Box
        style={{
          padding: "8px",
          paddingTop: "0px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {journal.length === 0 && <p>No records yet.</p>}
        {journal
          .sort((a, b) => b.date.localeCompare(a.date))
          .map((rec, i, arr) => {
            const label = getDayLabel(rec.date);

            let needHeader = false;
            if (i === 0) {
              needHeader = true;
            } else {
              const prevLabel = getDayLabel(arr[i - 1].date);
              if (prevLabel !== label) {
                needHeader = true;
              }
            }

            return (
              <div key={i}>
                {needHeader && (
                  <Box
                    sx={{
                      fontWeight: "bold",
                      marginTop: 2,
                      marginLeft: 1,
                      marginBottom: 1,
                      color: "cyan",
                    }}
                  >
                    {label}
                  </Box>
                )}

                <JournalNote journalRecord={rec} />
              </div>
            );
          })}
      </Box>
    </Box>
  );
};

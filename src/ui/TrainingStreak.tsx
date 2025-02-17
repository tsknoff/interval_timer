import { FC, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { JournalRecord } from "../App.tsx";
import { Slider } from "@mui/material";

interface ITrainingStreakProps {
  journal: JournalRecord[];
}

// Функции для dailyTotals, getStreak
function getDailyTotals(journal: JournalRecord[]): Record<string, number> {
  const dayMap: Record<string, number> = {};
  for (const rec of journal) {
    const [datePart] = rec.date.split(",");
    const [dayStr, monthStr, yearStr] = datePart.trim().split(".");
    const key = `${yearStr}-${monthStr}-${dayStr}`;
    const minutes = Math.floor(rec.duration / 60000);
    dayMap[key] = (dayMap[key] || 0) + minutes;
  }
  return dayMap;
}
function getStreak(dayMap: Record<string, number>, minPerDay: number): number {
  let streak = 0;
  const now = new Date();
  let cur = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  while (true) {
    const yyyy = cur.getFullYear();
    const mm = String(cur.getMonth() + 1).padStart(2, "0");
    const dd = String(cur.getDate()).padStart(2, "0");
    const key = `${yyyy}-${mm}-${dd}`;

    const totalMin = dayMap[key] || 0;
    if (totalMin >= minPerDay) {
      streak++;
      cur.setDate(cur.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export const TrainingStreak: FC<ITrainingStreakProps> = ({ journal }) => {
  // Вычисляем dayMap
  const dayMap = useMemo(() => getDailyTotals(journal), [journal]);

  // Смотрим, сколько минут "сегодня"
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const todayKey = `${yyyy}-${mm}-${dd}`;
  const todayMin = dayMap[todayKey] || 0;

  // Считаем стрик >=30 минут
  const streak30 = useMemo(() => getStreak(dayMap, 30), [dayMap]);
  // Можно считать стрик >=60 минут, >=180 тоже
  const streak60 = useMemo(() => getStreak(dayMap, 60), [dayMap]);
  const streak180 = useMemo(() => getStreak(dayMap, 180), [dayMap]);

  // Выбираем, какой "стрик" показывать. Например, >=30
  const currentStreak = streak30;

  // Слайдер 0..180, значение = todayMin
  const value = Math.min(todayMin, 180);
  const percent = (value / 180) * 100;

  return (
    <Box
      sx={{
        fontFamily: "sans-serif",
        color: "white",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      {/* Отображаем "стрик: X days" */}
      <Typography sx={{ fontSize: 14 }}>
        You have trained for {currentStreak} days
      </Typography>
      {/* Слайдер (0..180), disable interactions */}
      <Box sx={{ position: "relative" }}>
        <Slider
          min={0}
          max={180}
          value={value}
          disabled
          sx={{
            color: "green",
            width: "150px",
          }}
        />
        {/*/!* Огонёк поверх *!/*/}
        {/*<Box*/}
        {/*  sx={{*/}
        {/*    position: "absolute",*/}
        {/*    top: "50%",*/}
        {/*    transform: "translateY(-50%)",*/}
        {/*    left: `${percent}%`,*/}
        {/*    pointerEvents: "none",*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <LocalFireDepartmentIcon sx={{ color: "red" }} />*/}
        {/*</Box>*/}
      </Box>

      {/* Справа можно написать "X min today" */}
      <Typography sx={{ fontSize: 14 }}>{todayMin} min a day streak</Typography>
    </Box>
  );
};

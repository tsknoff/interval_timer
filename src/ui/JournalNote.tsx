// JournalNote.tsx

import { FC } from "react";
import { JournalRecord } from "../App.tsx";
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  useTheme,
} from "@mui/material";

/** Преобразуем miliseconds -> "1m 30s" или "2h 5m" */
function formatDuration(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  if (totalSec < 60) return `${totalSec}s`;

  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  if (min < 60) return `${min}m ${sec}s`;

  const hour = Math.floor(min / 60);
  const leftMin = min % 60;
  if (hour < 24) {
    return `${hour}h ${leftMin}m`;
  }

  // Если уж больше суток, можно ещё разбить по дням
  const days = Math.floor(hour / 24);
  const leftHour = hour % 24;
  return `${days}d ${leftHour}h`;
}

/** Показываем "time ago" (minutes, hours, days) или просто дату. */
function formatTimeAgo(dateStr: string): string {
  // Считаем, что dateStr = "13.02.2025, 16:35:08"
  // Попробуем распарсить
  const date = parseDate(dateStr);
  if (!date) return dateStr; // fallback

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  if (diffMs < 0) {
    // Будущее время? Тогда просто дата
    return date.toLocaleString();
  }

  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) {
    return "just now";
  }
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) {
    return diffMin === 1 ? "1 minute ago" : `${diffMin} minutes ago`;
  }
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) {
    return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
  }
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
  }
  // Если больше недели — показываем полную дату (или "X days ago", на ваш выбор)
  return date.toLocaleDateString();
}

/** Парсим строку вида "13.02.2025, 16:35:08" в объект Date */
function parseDate(dateStr: string): Date | null {
  try {
    const [dmy, hms] = dateStr.split(","); // ["13.02.2025", "16:35:08"]
    if (!dmy || !hms) return null;

    const [day, month, year] = dmy.trim().split(".");
    const [hour, minute, second] = hms.trim().split(":");
    if (!day || !month || !year) return null;

    const dd = parseInt(day, 10);
    const mm = parseInt(month, 10) - 1; // JS Date: месяц 0..11
    const yyyy = parseInt(year, 10);

    const hh = parseInt(hour || "0", 10);
    const min = parseInt(minute || "0", 10);
    const sec = parseInt(second || "0", 10);

    const d = new Date(yyyy, mm, dd, hh, min, sec);
    if (isNaN(d.getTime())) return null;
    return d;
  } catch {
    return null;
  }
}

/** Возвращает цвет для rating 0..100 */
function getRatingColor(rating: number) {
  // Пример логики: красноватый при низком, желтоватый средний, зеленоватый высокий
  if (rating < 30) return "#f44336"; // red
  if (rating < 60) return "#ff9800"; // orange
  if (rating < 80) return "#ffeb3b"; // yellow
  return "#4caf50"; // green
}

/** Возвращаем ширину полоски rating (0..100), обычно 100% max */
function getRatingWidth(rating: number) {
  return Math.min(rating, 100); // на всякий случай, чтобы не вышло за 100
}

interface IProps {
  journalRecord: JournalRecord;
}

export const JournalNote: FC<IProps> = ({ journalRecord }) => {
  const theme = useTheme();

  // Преобразуем время записи в "time ago"
  const timeAgoText = formatTimeAgo(journalRecord.date);

  // Форматируем duration в удобочитаемый вид
  const durationText = journalRecord.duration
    ? formatDuration(journalRecord.duration)
    : "—";

  return (
    <Card
      sx={{
        marginBottom: 2,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <CardContent>
        {/* Время ("time ago") и BPM */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 1,
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            {timeAgoText}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {journalRecord.bpm} BPM
          </Typography>
        </Box>

        {/* Duration */}
        <Box sx={{ marginBottom: 1 }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            Duration: {durationText}
          </Typography>
        </Box>

        {/* Technique / Pattern / Description */}
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {journalRecord.technique}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {journalRecord.pattern}
        </Typography>
        {journalRecord.description && (
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            {journalRecord.description}
          </Typography>
        )}

        {/* Rating */}
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
            Rating:
          </Typography>
          <Box
            sx={{
              backgroundColor: "#e0e0e0",
              width: "100%",
              height: 8,
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: `${getRatingWidth(journalRecord.rating)}%`,
                height: "100%",
                backgroundColor: getRatingColor(journalRecord.rating),
              }}
            />
          </Box>
        </Box>

        {/* Комментарий */}
        {journalRecord.comment && (
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            {journalRecord.comment}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

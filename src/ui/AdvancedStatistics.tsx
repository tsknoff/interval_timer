import React, { FC, useMemo } from "react";
import { Box, Button, Typography } from "@mui/material";
// Импортируем компоненты из Recharts
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { JournalRecord } from "../App.tsx";

interface AdvancedStatisticsProps {
  records: JournalRecord[];
}

/**
 * Пример «AdvancedStatistics»:
 * - BarChart: суммарное время (мин) по каждому pattern
 * - LineChart: динамика rating по времени (дата)
 * - PieChart: суммарное время по техникам
 */
export const AdvancedStatistics: FC<AdvancedStatisticsProps> = ({
  records,
}) => {
  // 1. Готовим данные

  // a) Суммарное время по pattern (BarChart)
  const patternData = useMemo(() => {
    // Map: pattern -> total duration (в минутах)
    const mapPattern: Record<string, number> = {};

    for (const rec of records) {
      const pat = rec.pattern || "(no pattern)";
      // в минутах
      const durMin = Math.floor(rec.duration / 60000);
      mapPattern[pat] = (mapPattern[pat] || 0) + durMin;
    }

    // Преобразуем в массив { pattern, totalMin }
    return Object.keys(mapPattern).map((pat) => ({
      pattern: pat,
      totalMin: mapPattern[pat],
    }));
  }, [records]);

  // b) Динамика rating по времени (LineChart)
  // Нужно отсортировать по дате, и преобразовать.
  const ratingData = useMemo(() => {
    // Преобразуем date (23.02.2025, 14:01:05) в Date, берём rating
    // и сортируем
    const arr = [...records].map((r) => {
      // упрощённый парсинг
      const [datePart] = r.date.split(",");
      const [dayStr, monthStr, yearStr] = datePart.trim().split(".");
      const dd = parseInt(dayStr, 10);
      const mm = parseInt(monthStr, 10) - 1;
      const yyyy = parseInt(yearStr, 10);
      const d = new Date(yyyy, mm, dd);

      return {
        dateObj: d,
        rating: r.rating,
      };
    });
    arr.sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());

    // Превращаем в Recharts-формат { name: '2025-02-23', rating: 74 }
    return arr.map((item) => {
      const iso = item.dateObj.toISOString().slice(0, 10); // "2025-02-23"
      return {
        name: iso,
        rating: item.rating,
      };
    });
  }, [records]);

  // c) Распределение техник (PieChart): total duration (min) по technique
  const techniqueData = useMemo(() => {
    const mapTech: Record<string, number> = {};
    for (const rec of records) {
      const tech = rec.technique || "(no technique)";
      const durMin = Math.floor(rec.duration / 60000);
      mapTech[tech] = (mapTech[tech] || 0) + durMin;
    }
    return Object.keys(mapTech).map((tech) => ({
      name: tech,
      value: mapTech[tech],
    }));
  }, [records]);

  // цвета для pie
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#00C49F",
    "#FFBB28",
  ];

  return (
    <Box
      sx={{
        color: "white",
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        width: "100%",
        gap: 4,
      }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
        }}
      >
        <Typography variant="h5">Advanced Statistics</Typography>
        <Button
          variant={"outlined"}
          endIcon={<CardMembershipIcon />}
          style={{
            color: "white",
          }}
        >
          Explore more statistics
        </Button>
      </Box>

      {/* 1) BarChart по pattern */}
      <Box
        style={{
          width: "100%",
          height: 300,
          background: "#222",
          padding: 8,
          borderRadius: 8,
        }}
      >
        <Typography>Time per Pattern</Typography>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={patternData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="pattern" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip
              contentStyle={{ backgroundColor: "#333", border: "none" }}
            />
            <Bar dataKey="totalMin" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* 2) LineChart (rating over time) */}
      <Box
        style={{
          width: "100%",
          height: 300,
          background: "#222",
          padding: 8,
          borderRadius: 8,
        }}
      >
        <Typography>Rating over Time</Typography>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={ratingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip
              contentStyle={{ backgroundColor: "#333", border: "none" }}
            />
            <Line
              type="monotone"
              dataKey="rating"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* 3) PieChart (technique distribution) */}
      <Box
        style={{
          width: "100%",
          height: 300,
          background: "#222",
          padding: 8,
          borderRadius: 8,
        }}
      >
        <Typography>Technique distribution</Typography>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={techniqueData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {techniqueData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#333", border: "none" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

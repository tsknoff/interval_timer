import { getColor } from "./ActivityGrid.tsx";
import { Box } from "@mui/material";

export const ActivityGridLegend = () => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 4,
        fontFamily: "sans-serif",
        color: "white",
        alignSelf: "flex-end",
      }}
    >
      Less
      <div
        style={{
          width: 14,
          height: 14,
          marginBottom: 2,
          backgroundColor: getColor(1),
          borderRadius: 2,
        }}
      />
      <div
        style={{
          width: 14,
          height: 14,
          marginBottom: 2,
          backgroundColor: getColor(2),
          borderRadius: 2,
        }}
      />
      <div
        style={{
          width: 14,
          height: 14,
          marginBottom: 2,
          backgroundColor: getColor(3),
          borderRadius: 2,
        }}
      />
      <div
        style={{
          width: 14,
          height: 14,
          marginBottom: 2,
          backgroundColor: getColor(4),
          borderRadius: 2,
        }}
      />
      <div
        style={{
          width: 14,
          height: 14,
          marginBottom: 2,
          backgroundColor: getColor(5),
          borderRadius: 2,
        }}
      />
      <div
        style={{
          width: 14,
          height: 14,
          marginBottom: 2,
          backgroundColor: getColor(6),
          borderRadius: 2,
        }}
      />
      <div
        style={{
          width: 14,
          height: 14,
          marginBottom: 2,
          backgroundColor: getColor(7),
          borderRadius: 2,
        }}
      />
      More
    </Box>
  );
};

import { JournalRecord } from "../App.tsx";
import React, { FC } from "react";
import { Box } from "@mui/material";

interface IProps {
  journalRecord: JournalRecord;
}

export const JournalNote: FC<IProps> = ({ journalRecord }) => {
  return (
    <Box sx={{ border: "1px solid #ccc", padding: "16px", mb: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>{journalRecord.date}</Box>
        <Box>{journalRecord.bpm} bpm</Box>
      </Box>
      <Box sx={{ mt: 1 }}>{journalRecord.technique}</Box>
      <Box sx={{ mt: 1 }}>{journalRecord.pattern}</Box>
      <Box sx={{ mt: 1 }}>{journalRecord.description}</Box>
      <Box sx={{ mt: 1 }}>{journalRecord.rating}</Box>
      <Box sx={{ mt: 1 }}>{journalRecord.comment}</Box>
    </Box>
  );
};

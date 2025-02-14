import { JournalRecord } from "../App.tsx";
import React, { FC } from "react";
import { Box } from "@mui/material";

interface IProps {
  journalRecord: JournalRecord;
}

export const JournalNote: FC<IProps> = ({ journalRecord }) => {
  return (
    <Box sx={{ border: "1px solid #ccc", padding: "16px", mb: 1 }}>
      <div
        style={{
          fontFamily: "sans-serif",
        }}
      >
        Date: {journalRecord.date}
      </div>
      <div
        style={{
          fontFamily: "sans-serif",
        }}
      >
        Subject: {journalRecord.subject}
      </div>
      <div
        style={{
          fontFamily: "sans-serif",
        }}
      >
        BPM: {journalRecord.bpm}
      </div>
      <div
        style={{
          fontFamily: "sans-serif",
        }}
      >
        Rating: {journalRecord.rating}
      </div>
      {journalRecord.comment && <div>Comment: {journalRecord.comment}</div>}
    </Box>
  );
};

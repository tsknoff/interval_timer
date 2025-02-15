import { FC } from "react";
import { Box } from "@mui/material";
import { JournalNote } from "./JournalNote.tsx";
import { JournalRecord } from "../App.tsx";
import EventNoteIcon from "@mui/icons-material/EventNote";

interface IJournalList {
  journal: JournalRecord[];
}

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
          justifyContent: "center",
          height: 48,
          backgroundColor: "#023385",
          width: "100%",
          position: "sticky",
          top: 0,
          gap: 8,
          zIndex: 1,
        }}
      >
        <EventNoteIcon />
        <h2>Practice journal</h2>
      </Box>

      <Box
        style={{
          padding: "8px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {journal.length === 0 && <p>No records yet.</p>}
        {journal
          .sort((a, b) => b.date.localeCompare(a.date))
          .map((rec, i) => (
            <JournalNote key={i} journalRecord={rec} />
          ))}
      </Box>
    </Box>
  );
};

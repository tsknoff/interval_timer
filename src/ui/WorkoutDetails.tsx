import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from "@mui/material";
import { Settings } from "./Settings.tsx";
import { FC } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { TimerItem } from "../dataFlow/TimerListModel.ts";

interface IWorkoutDetails {
  technique: string;
  pattern: string;
  description: string;
  rounds: TimerItem[][];
  bpm: number;
  setTechnique: (technique: string) => void;
  setPattern: (pattern: string) => void;
  setDescription: (description: string) => void;
  setRounds: (rounds: TimerItem[][]) => void;
  setBpm: (bpm: number) => void;
  handleStart: () => void;
  handleReset: () => void;
}

export const WorkoutDetails: FC<IWorkoutDetails> = ({
  technique,
  pattern,
  description,
  rounds,
  bpm,
  setTechnique,
  setPattern,
  setDescription,
  setRounds,
  setBpm,
  handleStart,
  handleReset,
}) => {
  return (
    <Box
      sx={{
        mb: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "stretch",
        width: "100%",
        maxWidth: 400,
        border: "1px solid white",
        borderRadius: 4,
        fontFamily: "sans-serif",
        color: "white",
        paddingLeft: 3,
        paddingRight: 3,
      }}
    >
      <h2>Workout details</h2>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 8,
        }}
      >
        <FormControl fullWidth>
          <InputLabel
            style={{
              color: "white",
              backgroundColor: "transparent",
            }}
          >
            Technique
          </InputLabel>
          <Select
            value={technique}
            label="Technique"
            onChange={(e) => setTechnique(e.target.value as string)}
            sx={{
              backgroundColor: "white",
            }}
            variant="outlined"
            size={"small"}
            style={{
              color: "white",
              backgroundColor: "transparent",
            }}
          >
            <MenuItem value="Warmup">Warmup</MenuItem>
            <MenuItem value="Steps">Steps</MenuItem>
            <MenuItem value="Steps">Chords</MenuItem>
            <MenuItem value="Steps">Legato-arpeggio</MenuItem>
            <MenuItem value="Legato">Legato</MenuItem>
            <MenuItem value="Alternate picking">Alternate picking</MenuItem>
            <MenuItem value="Downstroke">Downstroke</MenuItem>
            <MenuItem value="Sweep picking">Sweep picking</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Pattern"
          variant="outlined"
          size="small"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          slotProps={{
            inputLabel: { style: { color: "white" } },
          }}
          sx={{
            input: { color: "white" },
          }}
        />
      </Box>

      <TextField
        label="Description (optional)"
        variant="outlined"
        size="small"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        slotProps={{
          inputLabel: { style: { color: "white" } },
        }}
        sx={{
          input: { color: "white" },
        }}
      />
      {/* Settings для редактирования rounds */}
      <Settings rounds={rounds} setRounds={setRounds} />
      {/* BPM */}
      <Accordion
        disableGutters={true}
        style={{
          fontFamily: "sans-serif",
          backgroundColor: "transparent",
          color: "white",
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              style={{
                color: "white",
              }}
            />
          }
          aria-controls="panel1-content"
          id="panel1-header"
          style={{
            height: 50,
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
            }}
          >
            <img
              src={"assets/metronome.svg"}
              alt={"metronome"}
              style={{ width: 20, height: 20, marginRight: 5 }}
            />
            <h3 style={{ color: "white", width: "100px" }}>
              <strong>BPM: {bpm}</strong>
            </h3>
            <Slider
              value={bpm}
              onChange={(_e, newValue) => setBpm(newValue as number)}
              min={50}
              max={200}
              step={1}
              onClick={(e) => e.stopPropagation()}
              sx={{
                width: 200,
              }}
            />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      {/* Кнопки Start/Reset */}
      <Box
        sx={{
          marginBottom: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Button
          startIcon={<PlayArrowIcon />}
          variant="contained"
          sx={{ backgroundColor: "#001A6E" }}
          onClick={handleStart}
        >
          Start
        </Button>
        <Button
          startIcon={<RestartAltIcon />}
          variant="outlined"
          sx={{ backgroundColor: "white" }}
          onClick={handleReset}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

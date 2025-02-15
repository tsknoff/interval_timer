import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

function getFeedbackMessage(rating: number): string {
  if (rating <= 10) {
    return "I barely remembered the exercise; it was mostly just noise from the instrument.";
  } else if (rating <= 30) {
    return "Sometimes things clicked, but overall I fell out of tempo and the sound was quite rough.";
  } else if (rating <= 50) {
    return "Occasionally I stayed with the metronome, occasionally I didn't. I need more work on precision.";
  } else if (rating <= 70) {
    return "Overall not bad: I roughly kept the rhythm, but there were some flaws.";
  } else if (rating <= 90) {
    return "The tempo was quite good, the sound was almost always clean, with only a few slips.";
  } else {
    return "I kept perfect time with the metronome, each note lasted exactly as intended, and there were no extra noises.";
  }
}

interface IDialogWorkoutReview {
  showReviewDialog: boolean;
  setShowReviewDialog: (value: boolean) => void;
  trainingRating: number;
  setTrainingRating: (value: number) => void;
  trainingComment: string;
  setTrainingComment: (value: string) => void;
  handleSubmitReview: () => void;
}

export const DialogWorkoutReview: React.FC<IDialogWorkoutReview> = ({
  showReviewDialog,
  setShowReviewDialog,
  trainingRating,
  setTrainingRating,
  trainingComment,
  setTrainingComment,
  handleSubmitReview,
}) => {
  return (
    <Dialog open={showReviewDialog} onClose={() => setShowReviewDialog(false)}>
      <DialogTitle>Training Review</DialogTitle>
      <DialogContent
        style={{
          width: 500,
          height: 300,
        }}
      >
        <Typography>How was your performance?</Typography>
        <Slider
          value={trainingRating}
          onChange={(_e, newVal) => setTrainingRating(newVal as number)}
          min={0}
          max={100}
          step={1}
          sx={{ width: 200, mt: 2 }}
        />

        {/* Отображаем динамическое сообщение */}
        <Typography sx={{ mt: 2, mb: 2 }}>
          {getFeedbackMessage(trainingRating)}
        </Typography>

        <TextField
          label="Comments (optional)"
          multiline
          rows={3}
          fullWidth
          value={trainingComment}
          onChange={(e) => setTrainingComment(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowReviewDialog(false)}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmitReview}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

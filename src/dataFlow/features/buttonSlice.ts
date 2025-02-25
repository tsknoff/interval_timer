import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../apiClient.ts";

export interface IMenuButton {
  id: number;
  name: string;
  buttonUrl: string;
  message?: string;
  image?: File | null;
}

interface ButtonData {
  id: number;
  buttonName: string;
  buttonUrl: string;
  text: string;
  fileUrl: string | null;
}

interface ButtonsState {
  buttons: IMenuButton[];
  buttonInfo: ButtonData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  saveStatus: "idle" | "saving" | "succeeded" | "failed";
}

const initialState: ButtonsState = {
  buttons: [],
  buttonInfo: null,
  status: "idle",
  saveStatus: "idle",
};

// Обновленные Thunks для асинхронных действий
export const fetchButtons = createAsyncThunk(
  "buttons/fetchButtons",
  async () => {
    const response = await apiClient.get<IMenuButton[]>("/button.php");
    return response.data;
  },
);

export const addButton = createAsyncThunk(
  "buttons/addButton",
  async (name: string) => {
    const response = await apiClient.post("/button.php", { name });
    return response.data;
  },
);

export const deleteButton = createAsyncThunk(
  "buttons/deleteButton",
  async (id: number) => {
    const response = await apiClient.delete("/button.php", { data: { id } });
    return response.data;
  },
);

const buttonsSlice = createSlice({
  name: "buttons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchButtons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchButtons.fulfilled,
        (state, action: PayloadAction<IMenuButton[]>) => {
          state.status = "succeeded";
          state.buttons = action.payload;
        },
      )
      .addCase(fetchButtons.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addButton.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(
        deleteButton.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.buttons = state.buttons.filter(
            (button) => Number(button.id) !== action.payload,
          );
        },
      );
  },
});

export default buttonsSlice.reducer;

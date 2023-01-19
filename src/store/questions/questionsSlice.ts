import { RootState } from "../store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getQuestions } from "../../service/Api";
import { QuestionResponse } from "../../types";

export interface QuestionsState {
  questions: QuestionResponse[];
  status: "idle" | "loading" | "failed";
}

const initialState: QuestionsState = {
  questions: [],
  status: "idle",
};

export const fetchQuestions = createAsyncThunk(
  "questions/getQuestions",
  async (page: number) => {
    let ids = `${page.toString()}`;
    for (let i = 1; i < 20; i++) {
      ids = ids.concat(`;${page + i}`);
    }
    const response = await getQuestions(ids);
    return response.data;
  }
);

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuestions.pending, (state: QuestionsState) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state: QuestionsState, action) => {
        state.status = "idle";
        for (let i = 0; i < action.payload.items.length; i++) {
          state.questions = [...state.questions];
        }
      })
      .addCase(fetchQuestions.rejected, (state: QuestionsState) => {
        state.status = "failed";
      });
  },
});

export const selectQuestions = (state: RootState) => state.questions.questions;

export default questionsSlice.reducer;

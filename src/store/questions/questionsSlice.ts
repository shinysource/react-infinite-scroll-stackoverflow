import { RootState } from "../store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getQuestions, search } from "../../service/Api";
import { QuestionResponse } from "../../types";

export interface QuestionsState {
  questions: QuestionResponse[];
  status: "idle" | "loading" | "failed";
  isSearch: Boolean;
}

const initialState: QuestionsState = {
  questions: [],
  status: "idle",
  isSearch: false,
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

export const searchQuestions = createAsyncThunk(
  "questions/search",
  async ({ tagged, body }: { tagged: string; body: string }) => {
    const response = await search(tagged, body);
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
        state.isSearch = false;
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state: QuestionsState, action) => {
        state.isSearch = false;
        state.status = "idle";
        for (let i = 0; i < action.payload.items.length; i++) {
          state.questions = [...state.questions, action.payload.items[i]];
        }
      })
      .addCase(fetchQuestions.rejected, (state: QuestionsState) => {
        state.isSearch = false;
        state.status = "failed";
      })
      .addCase(searchQuestions.pending, (state: QuestionsState) => {
        state.status = "loading";
        state.isSearch = true;
      })
      .addCase(searchQuestions.fulfilled, (state: QuestionsState, action) => {
        state.status = "idle";
        state.isSearch = true;
        let tempQuestions = [];
        for (let i = 0; i < action.payload.items.length; i++) {
          tempQuestions.push(action.payload.items[i]);
        }
        state.questions = tempQuestions;
        console.log(tempQuestions);
      })
      .addCase(searchQuestions.rejected, (state: QuestionsState) => {
        state.isSearch = true;
        state.status = "failed";
      });
  },
});

export const selectQuestions = (state: RootState) => state.questions.questions;

export default questionsSlice.reducer;

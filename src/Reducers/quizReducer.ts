import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Choice {
  [key: string]: string;
}

interface Question {
  id: string;
  question: string;
  choices: Choice;
  answerType: "SINGLE" | "MULTIPLE";
  points: number;
}

interface QuizData {
  quizId: string;
  quizName: string;
  imageUrl: string;
  iconUrl: string;
  questions: Question[];
}

interface QuizState {
  quizData: QuizData | null;
  isLoading: boolean;
  error: string | null;
  currentPage: "home" | "firstPage" | "secondPage";
  selectedAnswers: { [questionId: string]: string };
}

const initialState: QuizState = {
  quizData: null,
  isLoading: false,
  error: null,
  currentPage: "home",
  selectedAnswers: {},
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    fetchQuizStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchQuizSuccess(state, action: PayloadAction<QuizData>) {
      state.isLoading = false;
      state.quizData = action.payload;
    },
    fetchQuizFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setCurrentPage(
      state,
      action: PayloadAction<"home" | "firstPage" | "secondPage">
    ) {
      state.currentPage = action.payload;
    },
    setAnswer(
      state,
      action: PayloadAction<{ questionId: string; answer: string }>
    ) {
      state.selectedAnswers[action.payload.questionId] = action.payload.answer;
    },
    resetQuiz(state) {
      state.selectedAnswers = {};
    },
  },
});

export const {
  fetchQuizStart,
  fetchQuizSuccess,
  fetchQuizFailure,
  setCurrentPage,
  setAnswer,
  resetQuiz,
} = quizSlice.actions;
export default quizSlice.reducer;

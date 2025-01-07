import axios from "axios";
import { AppDispatch } from "../../Store/index.ts";
import {
  fetchQuizStart,
  fetchQuizSuccess,
  fetchQuizFailure,
} from "../../Reducers/quizReducer.ts";

export const fetchRandomQuiz =
  (themeId: string) => async (dispatch: AppDispatch) => {
    const url = `https://d0d70d41-858e-4b30-89b0-3b6a3dd32625.mock.pstmn.io/user/quiz/random?themeId=${themeId}`;

    dispatch(fetchQuizStart());

    try {
      const response = await axios.get(url);
      dispatch(fetchQuizSuccess(response.data));
    } catch (error: any) {
      dispatch(
        fetchQuizFailure(
          error.response?.data?.message || "Failed to fetch quiz data"
        )
      );
    }
  };

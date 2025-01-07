import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { setCurrentPage } from "../../Reducers/quizReducer.ts";
import Home from "./Home.tsx"; // Adjust the path to your Home component
import QuizFirstPage from "./QuizFirstPage.tsx"; // Adjust the path
import QuizSecondPage from "./QuizSecondPage.tsx"; // Adjust the path

const ErrorPage = () => (
  <div className="text-center mt-10 text-xl text-red-500">
    <p>Something went wrong!</p>
  </div>
);

const QuizFlow = () => {
  const quizData = useSelector((state: RootState) => state.quiz.quizData);
  const currentPage = useSelector((state: RootState) => state.quiz.currentPage);
  const dispatch = useDispatch();

  // Ensure the currentPage is set to "home" when the quizData is unavailable
  useEffect(() => {
    if (!quizData) {
      dispatch(setCurrentPage("home"));
    }
  }, [quizData, dispatch]);

  // Render the appropriate page based on the currentPage state
  switch (currentPage) {
    case "home":
      return <Home />;
    case "firstPage":
      return <QuizFirstPage />;
    case "secondPage":
      return <QuizSecondPage />;
    default:
      return <ErrorPage />;
  }
};

export default QuizFlow;

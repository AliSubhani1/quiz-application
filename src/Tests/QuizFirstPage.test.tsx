import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom"; // For jest-dom matchers
import QuizFirstPage from "../Pages/Home/QuizFirstPage.tsx";
import {
  setCurrentPage,
  setAnswer,
  resetQuiz,
} from "../Reducers/quizReducer";

const mockStore = configureStore([thunk]);

describe("QuizFirstPage Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      quiz: {
        quizData: {
          quizName: "Theme quiz test",
          questions: [
            {
              id: "q1",
              question: "What is React?",
              choices: {
                1: "Library",
                2: "Framework",
                3: "Language",
                4: "Tool",
              },
            },
            {
              id: "q2",
              question: "What is Redux?",
              choices: {
                1: "State management",
                2: "Database",
                3: "Framework",
                4: "Library",
              },
            },
          ],
        },
        currentPage: "firstPage",
        selectedAnswers: {},
      },
    });

    jest.spyOn(store, "dispatch");
  });

  test("renders correctly with quiz data and first page", () => {
    render(
      <Provider store={store}>
        <QuizFirstPage />
      </Provider>
    );

    expect(screen.getByText("Theme quiz test")).toBeInTheDocument();
    expect(screen.getByText("What is React?")).toBeInTheDocument();
    expect(screen.getByText("What is Redux?")).toBeInTheDocument();
  });

  test("dispatches setAnswer when an option is selected", () => {
    render(
      <Provider store={store}>
        <QuizFirstPage />
      </Provider>
    );

    const options = screen.getAllByText("Library");
    const option1 = options[0]; // Select the first "Library" button
    fireEvent.click(option1);

    expect(store.dispatch).toHaveBeenCalledWith(
      setAnswer({ questionId: "q1", answer: "1" })
    );
    expect(
      screen.queryByText("Please select an answer for all questions before continuing.")
    ).not.toBeInTheDocument();
  });

  test("shows an error when trying to continue without selecting answers", () => {
    render(
      <Provider store={store}>
        <QuizFirstPage />
      </Provider>
    );

    const continueButton = screen.getByText("Continue quiz");
    fireEvent.click(continueButton);

    expect(
      screen.getByText("Please select an answer for all questions before continuing.")
    ).toBeInTheDocument();
  });

  test("navigates to the second page when all answers are selected", () => {
    store = mockStore({
      quiz: {
        quizData: {
          quizName: "Theme quiz test",
          questions: [
            {
              id: "q1",
              question: "What is React?",
              choices: {
                1: "Library",
                2: "Framework",
                3: "Language",
                4: "Tool",
              },
            },
            {
              id: "q2",
              question: "What is Redux?",
              choices: {
                1: "State management",
                2: "Database",
                3: "Framework",
                4: "Library",
              },
            },
          ],
        },
        currentPage: "firstPage",
        selectedAnswers: { q1: "1", q2: "1" },
      },
    });

    jest.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <QuizFirstPage />
      </Provider>
    );

    const continueButton = screen.getByText("Continue quiz");
    fireEvent.click(continueButton);

    expect(store.dispatch).toHaveBeenCalledWith(setCurrentPage("secondPage"));
  });

  test("resets quiz and navigates to home page on 'End quiz and exit'", () => {
    render(
      <Provider store={store}>
        <QuizFirstPage />
      </Provider>
    );

    const endQuizButton = screen.getByText("End quiz and exit");
    fireEvent.click(endQuizButton);

    expect(store.dispatch).toHaveBeenCalledWith(resetQuiz());
    expect(store.dispatch).toHaveBeenCalledWith(setCurrentPage("home"));
  });
});

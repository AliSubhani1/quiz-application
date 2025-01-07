import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom"; // Import for jest-dom matchers
import Home from "../Pages/Home/Home.tsx";
import { setCurrentPage } from "../Reducers/quizReducer.ts";
import { fetchRandomQuiz } from "../Utils/API/index.ts";

jest.mock("../Utils/API/index.ts", () => ({
  fetchRandomQuiz: jest.fn(() => jest.fn()),
}));

const mockStore = configureStore([thunk]);

describe("Home Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      quiz: {
        currentPage: "home",
      },
    });

    store.dispatch = jest.fn();
  });

  test("renders correctly when currentPage is 'home'", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Verify that the heading and button are rendered
    expect(screen.getByText("Theme quiz test")).toBeInTheDocument();
    expect(screen.getByText("Welcome to the Quiz")).toBeInTheDocument();
    expect(screen.getByText("Start Quiz")).toBeInTheDocument();
  });

  test("does not render when currentPage is not 'home'", () => {
    // Update the mock store to simulate currentPage !== 'home'
    store = mockStore({
      quiz: {
        currentPage: "firstPage",
      },
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Verify that the component does not render
    expect(screen.queryByText("Theme quiz test")).not.toBeInTheDocument();
    expect(screen.queryByText("Welcome to the Quiz")).not.toBeInTheDocument();
    expect(screen.queryByText("Start Quiz")).not.toBeInTheDocument();
  });

  test("dispatches fetchRandomQuiz and setCurrentPage when Start Quiz is clicked", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Simulate clicking the Start Quiz button
    const startQuizButton = screen.getByText("Start Quiz");
    await act(async () => {
      fireEvent.click(startQuizButton);
    });

    // Verify that fetchRandomQuiz was dispatched
    expect(store.dispatch).toHaveBeenCalledWith(fetchRandomQuiz("63a88cf1e774d167cd92c06f"));

    // Verify that setCurrentPage was dispatched
    expect(store.dispatch).toHaveBeenCalledWith(setCurrentPage("firstPage"));
  });
});

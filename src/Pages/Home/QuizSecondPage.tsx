import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { setCurrentPage, setAnswer, resetQuiz } from "../../Reducers/quizReducer.ts";
import TitleSection from "../../Components/TitleSection.tsx";
import ProgressBar from "../../Components/ProgressBar.tsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Utils/Constants/index.ts";

const QuizSecondPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quizData = useSelector((state: RootState) => state.quiz.quizData);
  const currentPage = useSelector((state: RootState) => state.quiz.currentPage);
  const selectedAnswers = useSelector((state: RootState) => state.quiz.selectedAnswers);

  const [error, setError] = useState<string | null>(null);

  if (!quizData || currentPage !== "secondPage") return null;

  const progressPercentage = (4 / quizData.questions.length) * 100;
  const secondPageQuestions = quizData.questions.slice(2, 4);

  const handleOptionSelect = (questionId: string, choiceKey: string) => {
    dispatch(setAnswer({ questionId, answer: choiceKey }));
    setError(null); 
  };

  const handleFinishQuiz = async () => {
    const unansweredQuestions = secondPageQuestions.filter(
      (question) => !selectedAnswers[question.id]
    );

    if (unansweredQuestions.length > 0) {
      setError("Please select an answer for all questions before submitting.");
      return;
    }

    const formattedAnswers = Object.entries(selectedAnswers).map(([questionId, userAnswer]) => ({
      questionId,
      userAnswer,
    }));

    try {
      const response = await axios.post(
        `${BASE_URL}user/quiz/${quizData.quizId}/submit`,
        { answers: formattedAnswers } 
      );

      if (response.status === 200) {
        navigate("/result"); 
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Failed to submit the quiz. Please try again.");
    }
    dispatch(resetQuiz());
  };

  return (
    <div className="bg-white-0 my-6 w-[80%] mx-auto min-h-[85vh]">
      <TitleSection heading={quizData.quizName} />
      <ProgressBar percentage={progressPercentage} currentQuestion={4} totalQuestions={4} />

      {secondPageQuestions.map((question) => (
        <div key={question.id} className="w-[90%] mx-auto my-8">
          <p className="text-lg font-semibold mb-4">{question.question}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-white-0">
            {Object.entries(question.choices).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleOptionSelect(question.id, key)}
                className={`py-2 px-4 rounded-md text-white ${
                  selectedAnswers[question.id] === key
                    ? "bg-red-1"
                    : "bg-red-0"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Error Message */}
      {error && (
        <div className="text-red-0 text-center mt-4">{error}</div>
      )}

      <div className="flex justify-between mt-8 w-[90%] mx-auto">
        <button
          className="text-red-0 hover:underline"
          onClick={() => {
            dispatch(setCurrentPage("home"));
            dispatch(resetQuiz());
          }}
        >
          End quiz and exit
        </button>
        <button
          className="bg-red-0 text-white py-2 px-6 rounded-md flex items-center gap-2 hover:opacity-90 text-white-0"
          onClick={handleFinishQuiz}
        >
          Finish quiz
        </button>
      </div>
    </div>
  );
};

export default QuizSecondPage;

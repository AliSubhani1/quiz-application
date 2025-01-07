import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import axios from "axios";
import TitleSection from "../../Components/TitleSection.tsx";
import HandEmoji from "../../Assets/Images/Emoji.svg";
import Spinner from "../../Components/Spinner.tsx";
import CorrectIcon from '../../Assets/Images/correctIcon.svg';
import WrongIcon from '../../Assets/Images/wrongIcon.svg';
import { resetQuiz, setCurrentPage } from "../../Reducers/quizReducer.ts";
import { useNavigate } from "react-router";

interface ResultDetails {
  questionId: string;
  question: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
}

interface QuizResult {
  quizId: string;
  quizName: string;
  totalScore: number;
  userScore: number;
  resultDetails: ResultDetails[];
}

const Result = () => {
const navigate = useNavigate();

  const dispatch = useDispatch();

  const [resultData, setResultData] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Quiz data from Redux store
  const quizData = useSelector((state: RootState) => state.quiz.quizData);

  // Fetch result data from the API
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `https://d0d70d41-858e-4b30-89b0-3b6a3dd32625.mock.pstmn.io/user/quiz/${quizData?.quizId}/result`
        );
        setResultData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching results:", err);
        setError("Failed to fetch results. Please try again.");
        setLoading(false);
      }
    };

    if (quizData) {
      fetchResults();
    }
  }, [quizData]);

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white-0 my-6 w-[80%] mx-auto h-[85vh] overflow-auto">
      {/* Title Section */}
      <TitleSection heading={resultData?.quizName || "Quiz Results"} />

      {/* Score Display */}
      <div className="flex flex-col justify-center items-center mb-10">
        <p className="mt-4 mb-4 text-2xl font-semibold">Your Quiz Results</p>
        <div className="border-2 border-red-0 py-4 px-12 flex flex-col items-center rounded-md min-w-[240px] sm:min-w-[340px] gap-4">
          <img src={HandEmoji} className="w-10 h-10" alt="hand emoji" />
          <p className="text-lg font-medium">
            You scored {resultData?.userScore} out of {resultData?.totalScore}
          </p>
        </div>
      </div>

      {/* Result Details */}
      <div className="w-[90%] mx-auto">
        {resultData?.resultDetails.map((detail) => {
          const question = quizData?.questions.find((q) => q.id === detail.questionId);
          return (
            <div key={detail.questionId} className="my-6">
              <div className="flex justify-between">
              <p className="font-semibold text-lg mb-2">{question?.question}</p>
              <div className="mt-2 text-green-600">
                {detail.isCorrect ? ( <img src={CorrectIcon} alt="correct icon" /> ) : ( <img src={WrongIcon} alt="wrong icon" /> )}
              </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-white-0">
                {Object.entries(question?.choices || {}).map(([key, value]) => (
                  <button
                    key={key}
                    className={`py-2 px-4 rounded-md text-white ${
                      key === detail.correctAnswer
                        ? "bg-green-0"
                        : key === detail.userAnswer && !detail.isCorrect
                        ? "bg-red-1"
                        : "bg-red-0"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-10 w-[90%] mx-auto">
        <button
          onClick={() => {dispatch(setCurrentPage("home"));
            dispatch(resetQuiz());
            navigate("/");
          }}
          className="text-red-0 underline"
        >
          Retake the quiz
        </button>
        <button
          onClick={() => {dispatch(setCurrentPage("home"));
            dispatch(resetQuiz());
            navigate("/");
          }}
          className="bg-red-0 text-white-0 text-white py-2 px-6 rounded-md flex items-center gap-2 hover:opacity-90"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Result;

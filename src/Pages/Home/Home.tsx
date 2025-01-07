import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/index.ts";
import { setCurrentPage } from "../../Reducers/quizReducer.ts";
import TitleSection from "../../Components/TitleSection.tsx";
import ArrowIcon from '../../Assets/Images/ArrowIcon.svg';
import { fetchRandomQuiz } from "../../Utils/API/index.ts";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector((state: RootState) => state.quiz.currentPage);

  const handleStartQuiz = async () => {
    await dispatch(fetchRandomQuiz("63a88cf1e774d167cd92c06f"));
    dispatch(setCurrentPage("firstPage"));
  };

  if (currentPage !== "home") return null;

  return (
    <div className="bg-white-0 my-6 w-[80%] mx-auto min-h-[85vh]">
      <TitleSection heading="Theme quiz test" />
      <div className="flex flex-col justify-center items-center">
        <p className="mt-4 mb-10 text-2xl font-semibold">Welcome to the Quiz</p>
        <button
          onClick={handleStartQuiz}
          className="bg-red-0 py-4 px-12 flex flex-col items-center rounded-md min-w-[240px] sm:min-w-[340px] gap-4 hover:opacity-90"
        >
          <img src={ArrowIcon} alt="arrow icon" />
          <p className="text-base text-white-0">Start Quiz</p>
        </button>
      </div>
    </div>
  );
};

export default Home;

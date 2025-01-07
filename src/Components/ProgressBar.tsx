import React from "react";

interface ProgressBarProps {
  percentage: number;
  totalQuestions: number;
  currentQuestion: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, totalQuestions, currentQuestion }) => {
  return (
    <div className="w-[95%] mx-auto flex items-center justify-between gap-8">
      <div className="w-[90%] bg-gray-0 rounded-full h-2.5 overflow-hidden relative">
        <div
          className="h-full rounded-full"
          style={{
            width: `${percentage}%`,
            background: "linear-gradient(90deg, #965af8, #cc3928)",
          }}
        ></div>
      </div>
      <p className="text-red-0 text-sm font-medium ml-2 whitespace-nowrap">
        {currentQuestion}/{totalQuestions} questions remaining
      </p>
    </div>
  );
};

export default ProgressBar;

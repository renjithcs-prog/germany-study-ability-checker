
import React, { useState, useEffect } from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  onAnswerSelect: (answer: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswerSelect, questionNumber, totalQuestions }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Reset fade effect when question changes
    setIsFadingOut(false);
    setSelectedOption(null);
  }, [question]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsFadingOut(true);
    setTimeout(() => {
      onAnswerSelect(option);
    }, 300); // Match duration with transition
  };

  return (
    <div className={`transition-opacity duration-300 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      <p className="text-sm font-medium text-red-500 mb-2">Question {questionNumber} of {totalQuestions}</p>
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-6">{question.text}</h2>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={!!selectedOption}
            className={`
              w-full text-left p-4 border rounded-lg transition-all duration-200
              ${selectedOption === option 
                ? 'bg-red-500 border-red-500 text-white shadow-lg scale-105' 
                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-red-400 dark:hover:border-red-500'
              }
              disabled:opacity-75 disabled:cursor-not-allowed
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

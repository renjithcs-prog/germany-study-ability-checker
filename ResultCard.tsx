
import React from 'react';
import { AssessmentResult } from '../types';

interface ResultCardProps {
  result: AssessmentResult;
  onRestart: () => void;
}

const getEligibilityColor = (eligibility: string) => {
  switch (eligibility.toLowerCase()) {
    case 'excellent':
      return 'text-green-500';
    case 'high':
      return 'text-blue-500';
    case 'medium':
      return 'text-yellow-500';
    case 'low':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

const Gauge: React.FC<{ score: number }> = ({ score }) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-200 dark:text-gray-700"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          className="text-red-500"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-gray-800 dark:text-white">{score}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">/ 100</span>
      </div>
    </div>
  );
};


export const ResultCard: React.FC<ResultCardProps> = ({ result, onRestart }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg w-full max-w-2xl text-center animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Your Assessment Result</h2>
      <p className={`text-xl font-semibold mb-4 ${getEligibilityColor(result.eligibility)}`}>
        {result.eligibility} Potential
      </p>
      
      <div className="my-6 flex justify-center">
        <Gauge score={result.score} />
      </div>

      <p className="text-gray-600 dark:text-gray-300 italic mb-6">{result.summary}</p>
      
      <div className="text-left my-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Personalized Advice:</h3>
        <ul className="space-y-3">
          {result.advice.map((item, index) => (
            <li key={index} className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onRestart}
        className="w-full sm:w-auto mt-6 bg-red-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        Start Over
      </button>
    </div>
  );
};

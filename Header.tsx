
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center p-4 md:p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
        Germany Study Ability Checker
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Assess your readiness to study in Germany with our AI-powered evaluation.
      </p>
    </header>
  );
};


import React, { useState, useCallback } from 'react';
import { Answers, AssessmentResult, Question, QuizState } from './types';
import { QUESTIONS } from './constants';
import { getStudyAbroadAssessment } from './services/geminiService';
import { Header } from './components/Header';
import { ProgressBar } from './components/ProgressBar';
import { QuestionCard } from './components/QuestionCard';
import { ResultCard } from './components/ResultCard';

const initialAnswers: Answers = {
  education: '',
  gpa: '',
  germanProficiency: '',
  englishProficiency: '',
  financialStatus: '',
  fieldOfStudy: '',
  admissionStatus: '',
};

const App: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStartQuiz = () => {
    setQuizState('quiz');
    setCurrentQuestionIndex(0);
    setAnswers(initialAnswers);
    setResult(null);
    setError(null);
  };

  const processAssessment = useCallback(async (finalAnswers: Answers) => {
    setQuizState('loading');
    setError(null);
    try {
      const assessment = await getStudyAbroadAssessment(finalAnswers);
      setResult(assessment);
      setQuizState('result');
    } catch (err) {
      setError('An error occurred while assessing your profile. Please try again.');
      setQuizState('quiz'); // Go back to the last question
      setCurrentQuestionIndex(QUESTIONS.length - 1);
    }
  }, []);

  const handleAnswerSelect = (answer: string) => {
    const currentQuestionKey = QUESTIONS[currentQuestionIndex].key;
    const newAnswers = { ...answers, [currentQuestionKey]: answer };
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      processAssessment(newAnswers);
    }
  };
  
  const renderContent = () => {
    switch (quizState) {
      case 'start':
        return (
          <div className="text-center animate-fade-in">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Ready to Check Your Potential?</h2>
            <p className="max-w-prose mx-auto text-gray-600 dark:text-gray-400 mb-8">
              Answer 7 simple questions about your academic background, language skills, and preparations. Our AI will provide a personalized assessment of your chances to study in Germany and offer tailored advice.
            </p>
            <button
              onClick={handleStartQuiz}
              className="bg-red-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Start Assessment
            </button>
          </div>
        );
      case 'quiz':
        return (
          <div className="w-full max-w-2xl animate-fade-in">
            <ProgressBar current={currentQuestionIndex} total={QUESTIONS.length} />
            <QuestionCard 
              question={QUESTIONS[currentQuestionIndex]} 
              onAnswerSelect={handleAnswerSelect}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={QUESTIONS.length}
            />
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          </div>
        );
      case 'loading':
        return (
          <div className="text-center animate-fade-in">
            <div className="w-16 h-16 border-4 border-red-500 border-dashed rounded-full animate-spin mx-auto"></div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mt-6">Analyzing Your Profile...</h2>
            <p className="text-gray-500 dark:text-gray-400">Our AI is preparing your personalized assessment.</p>
          </div>
        );
      case 'result':
        return result && <ResultCard result={result} onRestart={handleStartQuiz} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <main className="mt-8 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800/50 p-6 md:p-8 rounded-xl shadow-lg w-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;

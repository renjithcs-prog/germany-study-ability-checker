
export interface Question {
  id: number;
  key: keyof Answers;
  text: string;
  options: string[];
}

export interface Answers {
  education: string;
  gpa: string;
  germanProficiency: string;
  englishProficiency: string;
  financialStatus: string;
  fieldOfStudy: string;
  admissionStatus: string;
}

export interface AssessmentResult {
  score: number;
  eligibility: 'Low' | 'Medium' | 'High' | 'Excellent';
  summary: string;
  advice: string[];
}

export type QuizState = 'start' | 'quiz' | 'loading' | 'result';

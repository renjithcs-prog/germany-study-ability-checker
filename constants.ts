
import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    key: 'education',
    text: "What is your highest level of education completed?",
    options: ["High School Diploma", "Bachelor's Degree", "Master's Degree", "PhD or equivalent"],
  },
  {
    id: 2,
    key: 'gpa',
    text: "What is your approximate Grade Point Average (GPA) on a 4.0 scale?",
    options: ["3.7 - 4.0 (Excellent)", "3.3 - 3.6 (Good)", "2.7 - 3.2 (Average)", "Below 2.7"],
  },
  {
    id: 3,
    key: 'germanProficiency',
    text: "What is your current German language proficiency level?",
    options: ["C1/C2 (Fluent/Advanced)", "B1/B2 (Intermediate)", "A1/A2 (Beginner)", "None"],
  },
  {
    id: 4,
    key: 'englishProficiency',
    text: "What is your current English language proficiency level?",
    options: ["Native / C2", "C1 (Advanced)", "B2 (Upper-Intermediate)", "B1 or below"],
  },
  {
    id: 5,
    key: 'financialStatus',
    text: "How do you plan to finance your studies? (A blocked account of ~€11,208/year is required)",
    options: ["I have sufficient funds ready", "I can arrange the funds with family support", "I am applying for a scholarship", "I am still figuring out the financing"],
  },
  {
    id: 6,
    key: 'fieldOfStudy',
    text: "What is your intended field of study in Germany?",
    options: ["STEM (Science, Technology, Engineering, Math)", "Business & Economics", "Arts & Humanities", "Medicine & Health Sciences"],
  },
  {
    id: 7,
    key: 'admissionStatus',
    text: "What is the current status of your university admission?",
    options: ["I have a confirmed admission letter (Zulassungsbescheid)", "I have applied and am waiting for a response", "I am currently researching and preparing to apply", "I have not started the application process"],
  },
];

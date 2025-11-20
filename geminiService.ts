
import { GoogleGenAI, Type } from "@google/genai";
import { Answers, AssessmentResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getStudyAbroadAssessment = async (answers: Answers): Promise<AssessmentResult> => {
  const prompt = `
    Please assess the following student profile for their ability and readiness to study in Germany.
    Analyze the provided information and generate a comprehensive evaluation.

    Student Profile:
    - Highest Education: ${answers.education}
    - GPA: ${answers.gpa}
    - German Language Proficiency: ${answers.germanProficiency}
    - English Language Proficiency: ${answers.englishProficiency}
    - Financial Status for Blocked Account: ${answers.financialStatus}
    - Intended Field of Study: ${answers.fieldOfStudy}
    - University Admission Status: ${answers.admissionStatus}

    Based on this profile, provide a JSON response with a score from 0 to 100, an eligibility rating (Low, Medium, High, Excellent), a concise summary, and a list of personalized, actionable advice points.
    Focus on practical next steps and areas for improvement.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { 
              type: Type.INTEGER, 
              description: 'A numerical score from 0 to 100 representing the candidate\'s overall suitability.' 
            },
            eligibility: { 
              type: Type.STRING, 
              description: 'A rating of the candidate\'s chances, e.g., "Low", "Medium", "High", "Excellent".' 
            },
            summary: { 
              type: Type.STRING, 
              description: 'A brief one-sentence summary of the assessment.'
            },
            advice: {
              type: Type.ARRAY,
              description: 'A list of personalized advice points for the candidate.',
              items: { type: Type.STRING }
            }
          },
          required: ['score', 'eligibility', 'summary', 'advice']
        },
      },
    });

    const jsonText = response.text.trim();
    const result: AssessmentResult = JSON.parse(jsonText);
    return result;

  } catch (error) {
    console.error("Error fetching assessment from Gemini API:", error);
    throw new Error("Failed to get assessment. Please try again.");
  }
};

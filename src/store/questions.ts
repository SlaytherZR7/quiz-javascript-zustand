import { create } from 'zustand';
import type { Question } from '../types';
import { devtools, persist } from 'zustand/middleware';

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPrevQuestion: () => void;
  resetQuestions: () => void;
}

const API_URL = 'http://localhost:3000/';

export const useQuestionsStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          loading: false,
          questions: [],
          currentQuestion: 0,

          fetchQuestions: async (limit: number) => {
            const res = await fetch(`${API_URL}/data.json`);
            const json = await res.json();

            const questions = json
              .sort(() => Math.random() - 0.5)
              .slice(0, limit);
            set({ questions }, false, 'FETCH_QUESTIONS');
          },

          selectAnswer: (questionId: number, answerIndex: number) => {
            const { questions } = get();
            const newQuestions = structuredClone(questions);
            const questionIndex = newQuestions.findIndex(
              (q) => q.id === questionId,
            );
            const questionInfo = newQuestions[questionIndex];
            const isCorrectUserAnswer =
              questionInfo.correctAnswer === answerIndex;

            newQuestions[questionIndex] = {
              ...questionInfo,
              isCorrectUserAnswer,
              userSelectedAnswer: answerIndex,
            };
            set({ questions: newQuestions }, false, 'SELECT_ANSWER');
          },

          goNextQuestion: () => {
            const { currentQuestion, questions } = get();
            const nextQuestion = currentQuestion + 1;

            if (nextQuestion < questions.length) {
              set({ currentQuestion: nextQuestion }, false, 'GO_NEXT_QUESTION');
            }
          },

          goPrevQuestion: () => {
            const { currentQuestion } = get();
            const previousQuestion = currentQuestion - 1;

            if (previousQuestion >= 0) {
              set(
                { currentQuestion: previousQuestion },
                false,
                'GO_PREVIOUS_QUESTION',
              );
            }
          },

          resetQuestions: () => {
            set({ currentQuestion: 0, questions: [] }, false, 'RESET');
          },
        };
      },
      {
        name: 'questions',
      },
    ),
  ),
);

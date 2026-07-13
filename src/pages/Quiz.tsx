import { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout/DashboardLayout';
import quizQuestionsData from '../data/quizQuestions.json';

type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

type AnswerState = Record<number, string>;

const Quiz = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const shuffled = [...quizQuestionsData]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)
      .map((question) => ({ ...question }));

    setQuestions(shuffled);
  }, []);

  const currentQuestion = questions[currentIndex];

  const score = useMemo(() => {
    return questions.reduce((total, question) => {
      if (answers[question.id] === question.correctAnswer) {
        return total + 1;
      }
      return total;
    }, 0);
  }, [answers, questions]);

  const progressPercent = questions.length ? ((currentIndex + 1) / questions.length) * 100 : 0;

  const handleSelect = (option: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleTryAgain = () => {
    const shuffled = [...quizQuestionsData]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)
      .map((question) => ({ ...question }));

    setQuestions(shuffled);
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted(false);
  };

  if (!questions.length) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-gray-700">Loading quiz questions...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Assessment</p>
            <h1 className="text-2xl font-bold text-gray-900">Knowledge Quiz</h1>
            <p className="mt-1 text-sm text-gray-500">Answer 10 questions and review your results instantly.</p>
          </div>
          <div className="rounded-2xl bg-indigo-50 px-4 py-3 text-right">
            <p className="text-sm font-medium text-indigo-700">Progress</p>
            <p className="text-xl font-semibold text-indigo-900">{currentIndex + 1} / {questions.length}</p>
          </div>
        </div>

        {!submitted ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-500">Question {currentIndex + 1}</p>
                <h2 className="mt-1 text-xl font-semibold text-gray-900">{currentQuestion.question}</h2>
              </div>
              <div className="w-40">
                <div className="mb-2 h-2 overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full rounded-full bg-indigo-500" style={{ width: `${progressPercent}%` }} />
                </div>
                <p className="text-right text-sm text-gray-500">{Math.round(progressPercent)}% complete</p>
              </div>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = answers[currentQuestion.id] === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`flex w-full items-start rounded-xl border px-4 py-3 text-left transition ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className={`mr-3 mt-0.5 h-5 w-5 rounded-full border ${isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'}`} />
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              {currentIndex === questions.length - 1 ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  Finish Quiz
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Results</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">You scored {score} / {questions.length}</h2>
              <p className="mt-2 text-gray-600">
                {score === questions.length
                  ? 'Excellent work! You answered every question correctly.'
                  : score >= questions.length / 2
                    ? 'Nice job! You are doing well.'
                    : 'Keep practicing and try again to improve.'}
              </p>
              <button
                type="button"
                onClick={handleTryAgain}
                className="mt-6 rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                Try Again
              </button>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Review your answers</h3>
              <div className="mt-5 space-y-4">
                {questions.map((question, index) => {
                  const selectedAnswer = answers[question.id];
                  const isCorrect = selectedAnswer === question.correctAnswer;
                  return (
                    <div key={question.id} className="rounded-xl border border-gray-200 p-4">
                      <p className="font-semibold text-gray-900">{index + 1}. {question.question}</p>
                      <div className="mt-3 space-y-2 text-sm">
                        {question.options.map((option) => {
                          const isSelected = selectedAnswer === option;
                          const isCorrectOption = question.correctAnswer === option;
                          return (
                            <div
                              key={option}
                              className={`rounded-lg px-3 py-2 ${
                                isCorrectOption
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : isSelected
                                    ? 'bg-rose-50 text-rose-700'
                                    : 'bg-gray-50 text-gray-600'
                              }`}
                            >
                              {option}
                            </div>
                          );
                        })}
                      </div>
                      <p className={`mt-3 text-sm font-medium ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {isCorrect ? 'Correct' : `Incorrect — correct answer: ${question.correctAnswer}`}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Quiz;

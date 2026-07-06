import { useMemo, useState } from 'react'
import QuizQuestion from '../components/quiz/QuizQuestion'
import QuizResult from '../components/quiz/QuizResult'
import ProgressBar from '../components/quiz/ProgressBar'
import QuizNavigation from '../components/quiz/QuizNavigation'

type QuizQuestionData = {
  id: number
  question: string
  options: Array<{ id: string; text: string }>
  correctAnswer: string
}

const QUIZ_QUESTIONS: QuizQuestionData[] = [
  {
    id: 1,
    question: 'What does JSX stand for?',
    options: [
      { id: 'A', text: 'JavaScript XML' },
      { id: 'B', text: 'Java Syntax Extension' },
      { id: 'C', text: 'JavaScript Extension' },
    ],
    correctAnswer: 'A',
  },
  {
    id: 2,
    question: 'Which hook is used for managing component state?',
    options: [
      { id: 'A', text: 'useEffect' },
      { id: 'B', text: 'useState' },
      { id: 'C', text: 'useMemo' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 3,
    question: 'Which tool is commonly used to bundle a React app?',
    options: [
      { id: 'A', text: 'Webpack' },
      { id: 'B', text: 'Photoshop' },
      { id: 'C', text: 'Figma' },
    ],
    correctAnswer: 'A',
  },
]

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [showResult, setShowResult] = useState(false)

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex]
  const selectedAnswer = selectedAnswers[currentQuestion.id] ?? null

  const score = useMemo(() => {
    return QUIZ_QUESTIONS.reduce((count, question) => {
      return count + (selectedAnswers[question.id] === question.correctAnswer ? 1 : 0)
    }, 0)
  }, [selectedAnswers])

  const handleSelect = (answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    setShowResult(true)
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setShowResult(false)
  }

  return (
    <div className="w-full bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8">
        <div className="rounded-[32px] border border-slate-200 bg-white px-8 py-8 shadow-[0_30px_80px_rgba(148,163,184,0.15)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Interactive quiz</p>
              
              <p className="mt-4 text-base leading-7 text-slate-600">
                Test your knowledge with a quick set of starter questions and review your score instantly.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600 shadow-sm shadow-slate-200">
              <div className="font-medium text-slate-900">
                {Object.keys(selectedAnswers).length} of {QUIZ_QUESTIONS.length} answered
              </div>
            </div>
          </div>
        </div>

        <div className="w-full rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(148,163,184,0.1)]">
          {!showResult ? (
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Quiz progress</p>
                  <p className="text-lg font-semibold text-slate-900">
                    Question {Math.min(currentQuestionIndex + 1, QUIZ_QUESTIONS.length)} of {QUIZ_QUESTIONS.length}
                  </p>
                </div>
                <div className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
                  {Math.round(((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100)}% complete
                </div>
              </div>

              <ProgressBar current={currentQuestionIndex} total={QUIZ_QUESTIONS.length} />
              <QuizQuestion question={currentQuestion} selectedAnswer={selectedAnswer} onSelect={handleSelect} />
              <QuizNavigation
                currentIndex={currentQuestionIndex}
                onPrev={handlePrev}
                onNext={handleNext}
                onSubmit={handleSubmit}
                isLastQuestion={currentQuestionIndex === QUIZ_QUESTIONS.length - 1}
                isCurrentAnswered={selectedAnswer !== null}
              />
            </div>
          ) : (
            <div className="mx-auto max-w-3xl px-4 py-8">
              <QuizResult score={score} total={QUIZ_QUESTIONS.length} onRestart={handleRestart} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

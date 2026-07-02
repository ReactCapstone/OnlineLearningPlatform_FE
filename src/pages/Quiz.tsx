import { useMemo, useState } from 'react'
import QuizQuestion from '../components/quiz/QuizQuestion'
import QuizResult from '../components/quiz/QuizResult'

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
    <div className="mx-auto flex w-full max-w-5xl flex-col px-6 py-16">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-light">Interactive quiz</p>
          <h1 className="mt-2 text-3xl font-bold text-white-soft">React fundamentals quiz</h1>
          <p className="mt-2 max-w-2xl text-muted">
            Test your knowledge with a quick set of starter questions and review your score instantly.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-muted">
          <span className="font-semibold text-white-soft">{Object.keys(selectedAnswers).length}</span> of {QUIZ_QUESTIONS.length} answered
        </div>
      </div>

      {!showResult ? (
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-indigo/10">
          <QuizQuestion question={currentQuestion} selectedAnswer={selectedAnswer} onSelect={handleSelect} />
        
        </div>
      ) : (
        <QuizResult score={score} total={QUIZ_QUESTIONS.length} onRestart={handleRestart} />
      )}
    </div>
  )
}

import { useEffect, useState } from 'react'
import ProgressBar from '../components/quiz/ProgressBar'
import QuizNavigation from '../components/quiz/QuizNavigation'
import QuizQuestion from '../components/quiz/QuizQuestion'
import QuizResult from '../components/quiz/QuizResult'
import { getRandomQuestions, getAllCourses, calculateScore, QuizQuestion as QuizQuestionType } from '../utils/quizUtils'

export default function Quiz() {
  const [questions, setQuestions] = useState<QuizQuestionType[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [showResult, setShowResult] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<number>(1)
  const [showCourseSelection, setShowCourseSelection] = useState(true)
  const [quizResult, setQuizResult] = useState<any>(null)
  const courses = getAllCourses()

  // Load random questions when course is selected
  useEffect(() => {
    if (!showCourseSelection) {
      const randomQuestions = getRandomQuestions(selectedCourse, 10, 'all')
      setQuestions(randomQuestions)
      setCurrentQuestionIndex(0)
      setSelectedAnswers({})
      setShowResult(false)
    }
  }, [showCourseSelection, selectedCourse])

  const currentQuestion = questions[currentQuestionIndex]
  const selectedAnswer = selectedAnswers[currentQuestion?.id] ?? null

  const handleSelectCourse = (courseId: number) => {
    setSelectedCourse(courseId)
    setShowCourseSelection(false)
  }

  const handleSelect = (answer: string) => {
    if (currentQuestion) {
      setSelectedAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }))
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    const result = calculateScore(questions, selectedAnswers)
    setQuizResult(result)
    setShowResult(true)
  }

  const handleRestart = () => {
    const randomQuestions = getRandomQuestions(selectedCourse, 10, 'all')
    setQuestions(randomQuestions)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setShowResult(false)
    setQuizResult(null)
  }

  const handleChangeCourse = () => {
    setShowCourseSelection(true)
    setShowResult(false)
    setQuizResult(null)
  }

  // Course Selection Screen
  if (showCourseSelection) {
    return (
      <div className="min-h-screen w-full bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-slate-900">Select a Course</h1>
            <p className="mt-2 text-slate-600">Choose a course to take a quiz and test your knowledge</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {courses.map((course) => (
              <button
                key={course.courseId}
                onClick={() => handleSelectCourse(course.courseId)}
                className="rounded-[28px] border border-slate-200 bg-white p-8 text-left shadow-sm shadow-slate-200 transition hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-200"
              >
                <h3 className="text-xl font-bold text-slate-900">{course.courseName}</h3>
                <p className="mt-2 text-slate-600">{course.questionCount} questions available</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!currentQuestion || questions.length === 0) {
    return <div className="flex items-center justify-center py-12">Loading quiz...</div>
  }

  const courseName = courses.find((c) => c.courseId === selectedCourse)?.courseName || 'Quiz'

  return (
    <div className="w-full bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Interactive Quiz</p>
            <h1 className="mt-2 text-4xl font-bold text-slate-900">{courseName}</h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              Test your knowledge with randomly selected questions and review your score instantly.
            </p>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-slate-50 px-6 py-4 text-sm text-slate-600 shadow-sm shadow-slate-200">
            <span className="font-semibold text-slate-900">{Object.keys(selectedAnswers).length}</span> of{' '}
            {questions.length} answered
          </div>
        </div>

        {!showResult ? (
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200">
            <ProgressBar current={currentQuestionIndex} total={questions.length} />
            <QuizQuestion question={currentQuestion} selectedAnswer={selectedAnswer} onSelect={handleSelect} />
            <QuizNavigation
              currentIndex={currentQuestionIndex}
              onPrev={handlePrev}
              onNext={handleNext}
              onSubmit={handleSubmit}
              isLastQuestion={currentQuestionIndex === questions.length - 1}
              isCurrentAnswered={selectedAnswer !== null}
            />
          </div>
        ) : quizResult ? (
          <div>
            <QuizResult score={quizResult.score} total={quizResult.total} onRestart={handleRestart} />

            {/* Detailed Results */}
            <div className="mt-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Detailed Results</h2>
              <div className="space-y-4">
                {quizResult.results.map((result: any, index: number) => (
                  <div
                    key={result.questionId}
                    className={`rounded-[24px] border p-5 ${
                      result.isCorrect
                        ? 'border-green-200 bg-green-50'
                        : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-600">Q{index + 1}</span>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          result.isCorrect
                            ? 'bg-green-200 text-green-800'
                            : 'bg-red-200 text-red-800'
                        }`}
                      >
                        {result.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    </div>
                    <p className="text-slate-900 font-medium mb-3">{result.question}</p>
                    <div className="space-y-2 text-sm text-slate-600">
                      <p>Your answer: <span className="font-semibold text-slate-900">{result.selectedAnswer}</span></p>
                      {!result.isCorrect && (
                        <p className="text-green-700">Correct answer: <span className="font-semibold">{result.correctAnswer}</span></p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleChangeCourse}
                className="mt-6 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                Try Another Course
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

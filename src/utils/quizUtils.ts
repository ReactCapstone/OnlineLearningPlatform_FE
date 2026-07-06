import quizData from '../data/quizData.json'

export interface QuizQuestion {
  id: number
  question: string
  difficulty: 'easy' | 'medium' | 'hard'
  topic: string
  options: Array<{ id: string; text: string }>
  correctAnswer: string
}

/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Get random questions from a specific course
 * @param courseId - The course ID
 * @param count - Number of questions to return (default: 10)
 * @param difficulty - Filter by difficulty level ('easy', 'medium', 'hard', 'all')
 * @returns Array of random quiz questions with shuffled options
 */
export function getRandomQuestions(
  courseId: number,
  count: number = 10,
  difficulty: 'easy' | 'medium' | 'hard' | 'all' = 'all'
): QuizQuestion[] {
  // Find the course
  const course = quizData.courses.find((c) => c.courseId === courseId)
  if (!course) {
    console.warn(`Course with ID ${courseId} not found`)
    return []
  }

  // Filter by difficulty if specified
  let filteredQuestions = course.questions
  if (difficulty !== 'all') {
    filteredQuestions = course.questions.filter((q) => q.difficulty === difficulty)
  }

  // Shuffle and slice to get random questions
  const randomQuestions = shuffleArray(filteredQuestions).slice(0, count)

  // Shuffle options for each question to randomize answer positions
  return randomQuestions.map((question) => ({
    ...question,
    difficulty: question.difficulty as 'easy' | 'medium' | 'hard',
    options: shuffleArray(question.options),
  }))
}

/**
 * Get all courses available
 */
export function getAllCourses() {
  return quizData.courses.map((course) => ({
    courseId: course.courseId,
    courseName: course.courseName,
    questionCount: course.questions.length,
  }))
}

/**
 * Get course details
 */
export function getCourseById(courseId: number) {
  return quizData.courses.find((c) => c.courseId === courseId)
}

/**
 * Calculate quiz score
 */
export function calculateScore(
  questions: QuizQuestion[],
  answers: Record<number, string>
): {
  score: number
  total: number
  percentage: number
  results: Array<{
    questionId: number
    question: string
    selectedAnswer: string
    correctAnswer: string
    isCorrect: boolean
  }>
} {
  let score = 0
  const results: any[] = []

  questions.forEach((question) => {
    const selectedAnswer = answers[question.id]
    const isCorrect = selectedAnswer === question.correctAnswer

    if (isCorrect) {
      score++
    }

    results.push({
      questionId: question.id,
      question: question.question,
      selectedAnswer: selectedAnswer || 'Not answered',
      correctAnswer: question.correctAnswer,
      isCorrect,
    })
  })

  return {
    score,
    total: questions.length,
    percentage: Math.round((score / questions.length) * 100),
    results,
  }
}

/**
 * Get difficulty statistics
 */
export function getDifficultyStats(questions: QuizQuestion[]) {
  const stats = {
    easy: questions.filter((q) => q.difficulty === 'easy').length,
    medium: questions.filter((q) => q.difficulty === 'medium').length,
    hard: questions.filter((q) => q.difficulty === 'hard').length,
  }
  return stats
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../../components/layout/AdminLayout/AdminLayout'
import Modal from '../../../components/common/Modal/Modal'
import { ALL_COURSES } from '../../../data/courses'

interface Question {
  id: number
  question: string
  options: [string, string, string, string]
  correctAnswer: string
}

interface QuestionErrors {
  question?: string
  options?: string
  correctAnswer?: string
}

interface FormErrors {
  courseId?: string
  title?: string
  level?: string
  description?: string
  questions?: string
}

const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

const EMPTY_QUESTION = (): Question => ({
  id: Date.now(),
  question: '',
  options: ['', '', '', ''],
  correctAnswer: '',
})

export default function AddAssessment() {
  const [form, setForm] = useState({
    courseId: '',
    title: '',
    level: '',
    description: '',
  })
  const [questions, setQuestions] = useState<Question[]>([EMPTY_QUESTION()])
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [questionErrors, setQuestionErrors] = useState<Record<number, QuestionErrors>>({})
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // ── Form handlers ──────────────────────────────────────────────────────────
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setFormErrors(prev => ({ ...prev, [name]: undefined }))
  }

  // ── Question handlers ──────────────────────────────────────────────────────
  const handleQuestionChange = (index: number, value: string) => {
    setQuestions(prev => prev.map((q, i) => i === index ? { ...q, question: value } : q))
    setQuestionErrors(prev => ({ ...prev, [index]: { ...prev[index], question: undefined } }))
  }

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    setQuestions(prev => prev.map((q, i) => {
      if (i !== qIndex) return q
      const newOptions = [...q.options] as [string, string, string, string]
      newOptions[oIndex] = value
      // if correct answer was this option, clear it
      const correctAnswer = q.correctAnswer === q.options[oIndex] ? '' : q.correctAnswer
      return { ...q, options: newOptions, correctAnswer }
    }))
    setQuestionErrors(prev => ({ ...prev, [qIndex]: { ...prev[qIndex], options: undefined } }))
  }

  const handleCorrectAnswerChange = (qIndex: number, value: string) => {
    setQuestions(prev => prev.map((q, i) => i === qIndex ? { ...q, correctAnswer: value } : q))
    setQuestionErrors(prev => ({ ...prev, [qIndex]: { ...prev[qIndex], correctAnswer: undefined } }))
  }

  const addQuestion = () => {
    setQuestions(prev => [...prev, EMPTY_QUESTION()])
  }

  const removeQuestion = (index: number) => {
    if (questions.length === 1) return
    setQuestions(prev => prev.filter((_, i) => i !== index))
    setQuestionErrors(prev => {
      const next = { ...prev }
      delete next[index]
      return next
    })
  }

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const newFormErrors: FormErrors = {}
    if (!form.courseId) newFormErrors.courseId = 'Please select a course.'
    if (!form.title.trim()) newFormErrors.title = 'Assessment title is required.'
    if (!form.level) newFormErrors.level = 'Please select a difficulty level.'
    if (!form.description.trim()) newFormErrors.description = 'Description is required.'
    if (questions.length === 0) newFormErrors.questions = 'Add at least one question.'

    const newQErrors: Record<number, QuestionErrors> = {}
    questions.forEach((q, i) => {
      const qErr: QuestionErrors = {}
      if (!q.question.trim()) qErr.question = 'Question text is required.'
      if (q.options.some(o => !o.trim())) qErr.options = 'All 4 options must be filled in.'
      if (!q.correctAnswer) qErr.correctAnswer = 'Please select the correct answer.'
      if (Object.keys(qErr).length > 0) newQErrors[i] = qErr
    })

    setFormErrors(newFormErrors)
    setQuestionErrors(newQErrors)
    return Object.keys(newFormErrors).length === 0 && Object.keys(newQErrors).length === 0
  }

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      // TODO: replace with real backend API call
      // await assessmentService.addAssessment({ ...form, questions })
      await new Promise(resolve => setTimeout(resolve, 800))
      setShowSuccess(true)
    } catch (err) {
      console.error('Failed to add assessment', err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setForm({ courseId: '', title: '', level: '', description: '' })
    setQuestions([EMPTY_QUESTION()])
    setFormErrors({})
    setQuestionErrors({})
    setShowSuccess(false)
  }

  const inputClass = (error?: string) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all
    ${error
      ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-200'
      : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
    }`

  const selectedCourse = ALL_COURSES.find(c => c.id === Number(form.courseId))

  return (
    <AdminLayout>
      <div className="max-w-[780px]">

        {/* Page header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Add Assessment</h2>
          <p className="text-sm text-gray-500 mt-1">Create a quiz for a course with multiple choice questions.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ── Card 1: Assessment details ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest">Assessment Details</h3>

            {/* Course selector */}
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-700">
                Course <span className="text-red-500">*</span>
              </span>
              <select
                name="courseId"
                value={form.courseId}
                onChange={handleFormChange}
                className={`${inputClass(formErrors.courseId)} bg-white cursor-pointer`}
              >
                <option value="" disabled>Select a course</option>
                {ALL_COURSES.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.icon} {course.title}
                  </option>
                ))}
              </select>
              {formErrors.courseId && <span className="text-xs text-red-500">{formErrors.courseId}</span>}
              {selectedCourse && (
                <div className="flex items-center gap-2 mt-1 p-2.5 bg-indigo-50 rounded-lg border border-indigo-100">
                  <span className="text-lg">{selectedCourse.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-indigo-700">{selectedCourse.title}</p>
                    <p className="text-[0.68rem] text-indigo-500">{selectedCourse.category} · {selectedCourse.lessons} lessons · ₹{selectedCourse.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              )}
            </label>

            {/* Title + Level row */}
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-gray-700">
                  Assessment Title <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  placeholder="e.g. React Fundamentals Quiz"
                  className={inputClass(formErrors.title)}
                />
                {formErrors.title && <span className="text-xs text-red-500">{formErrors.title}</span>}
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-gray-700">
                  Difficulty Level <span className="text-red-500">*</span>
                </span>
                <select
                  name="level"
                  value={form.level}
                  onChange={handleFormChange}
                  className={`${inputClass(formErrors.level)} bg-white cursor-pointer`}
                >
                  <option value="" disabled>Select level</option>
                  {LEVELS.map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
                {formErrors.level && <span className="text-xs text-red-500">{formErrors.level}</span>}
              </label>
            </div>

            {/* Description */}
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-700">
                Description <span className="text-red-500">*</span>
              </span>
              <textarea
                name="description"
                value={form.description}
                onChange={handleFormChange}
                placeholder="Brief description of what this assessment covers..."
                rows={2}
                className={`${inputClass(formErrors.description)} resize-none`}
              />
              {formErrors.description && <span className="text-xs text-red-500">{formErrors.description}</span>}
            </label>
          </div>

          {/* ── Card 2: Questions ── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest">Questions</h3>
                <p className="text-xs text-gray-400 mt-0.5">{questions.length} question{questions.length !== 1 ? 's' : ''} added</p>
              </div>
              {formErrors.questions && (
                <span className="text-xs text-red-500">{formErrors.questions}</span>
              )}
            </div>

            {questions.map((q, qIndex) => (
              <div key={q.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">

                {/* Question header */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                    Question {qIndex + 1}
                  </span>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(qIndex)}
                      className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-medium transition-colors cursor-pointer"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                      </svg>
                      Remove
                    </button>
                  )}
                </div>

                {/* Question text */}
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-gray-700">Question Text <span className="text-red-500">*</span></span>
                  <input
                    type="text"
                    value={q.question}
                    onChange={e => handleQuestionChange(qIndex, e.target.value)}
                    placeholder="e.g. What is React primarily used for?"
                    className={inputClass(questionErrors[qIndex]?.question)}
                  />
                  {questionErrors[qIndex]?.question && (
                    <span className="text-xs text-red-500">{questionErrors[qIndex].question}</span>
                  )}
                </label>

                {/* Options */}
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-700">
                    Options <span className="text-red-500">*</span>
                    <span className="text-gray-400 font-normal ml-1">(fill all 4)</span>
                  </span>
                  {q.options.map((opt, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">
                        {String.fromCharCode(65 + oIndex)}
                      </span>
                      <input
                        type="text"
                        value={opt}
                        onChange={e => handleOptionChange(qIndex, oIndex, e.target.value)}
                        placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                        className={inputClass(questionErrors[qIndex]?.options)}
                      />
                    </div>
                  ))}
                  {questionErrors[qIndex]?.options && (
                    <span className="text-xs text-red-500">{questionErrors[qIndex].options}</span>
                  )}
                </div>

                {/* Correct answer */}
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-gray-700">
                    Correct Answer <span className="text-red-500">*</span>
                  </span>
                  <select
                    value={q.correctAnswer}
                    onChange={e => handleCorrectAnswerChange(qIndex, e.target.value)}
                    className={`${inputClass(questionErrors[qIndex]?.correctAnswer)} bg-white cursor-pointer`}
                  >
                    <option value="" disabled>Select the correct option</option>
                    {q.options.filter(o => o.trim()).map((opt, oIndex) => (
                      <option key={oIndex} value={opt}>
                        {String.fromCharCode(65 + q.options.indexOf(opt))} — {opt}
                      </option>
                    ))}
                  </select>
                  {questionErrors[qIndex]?.correctAnswer && (
                    <span className="text-xs text-red-500">{questionErrors[qIndex].correctAnswer}</span>
                  )}
                </label>

                {/* Correct answer preview */}
                {q.correctAnswer && (
                  <div className="flex items-center gap-2 p-2.5 bg-green-50 rounded-lg border border-green-100">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    <span className="text-xs font-medium text-green-700">Correct: {q.correctAnswer}</span>
                  </div>
                )}
              </div>
            ))}

            {/* Add question button */}
            <button
              type="button"
              onClick={addQuestion}
              className="w-full py-3 rounded-xl border-2 border-dashed border-gray-200 text-sm font-medium text-gray-500 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add another question
            </button>
          </div>

          {/* ── Summary ── */}
          {questions.length > 0 && form.courseId && (
            <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-5 flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-sm font-semibold text-indigo-700">Ready to publish</p>
                <p className="text-xs text-indigo-500 mt-0.5">
                  {questions.length} question{questions.length !== 1 ? 's' : ''} for{' '}
                  {selectedCourse?.title ?? 'selected course'}
                  {form.level ? ` · ${form.level}` : ''}
                </p>
              </div>
              <span className="text-2xl font-bold text-indigo-700">{questions.length}Q</span>
            </div>
          )}

          {/* ── Actions ── */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Reset form
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-500 hover:to-purple-400 text-white text-sm font-semibold transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-indigo-500/20"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Publishing...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Publish Assessment
                </>
              )}
            </button>
          </div>

        </form>
      </div>

      {/* Success modal */}
      {showSuccess && (
        <Modal onClose={() => setShowSuccess(false)} ariaLabel="Assessment published">
          <div className="bg-white rounded-2xl p-8 max-w-[400px] w-full text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Assessment Published!</h3>
            <p className="text-sm text-gray-500 mb-1">
              <span className="font-medium text-gray-700">{form.title}</span> has been added
            </p>
            <p className="text-sm text-gray-500 mb-6">
              {questions.length} question{questions.length !== 1 ? 's' : ''} for{' '}
              <span className="font-medium text-gray-700">{selectedCourse?.title}</span>
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm font-medium text-gray-600 transition-colors cursor-pointer"
              >
                Add another
              </button>
              <Link
                to="/admin/assessments/view"
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-500 hover:to-purple-400 text-white text-sm font-semibold transition-all text-center"
              >
                View assessments
              </Link>
            </div>
          </div>
        </Modal>
      )}

    </AdminLayout>
  )
}
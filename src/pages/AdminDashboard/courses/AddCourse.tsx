import { useState } from 'react'
import AdminLayout from '../../../components/layout/AdminLayout/AdminLayout'
import { Link } from 'react-router-dom'
import courseService from '../../../services/courseService'

const CATEGORY_OPTIONS = [
  'Programming', 'Web Development', 'Database', 'Design', 'Frontend', 'Backend', 'AI / ML', 'DevOps',
  'Security', 'Data', 'Mobile', 'Algorithms', 'Fullstack', 'Soft Skills',
]

// TODO: replace with real category IDs from the backend (or fetch via GET /Categories)
const CATEGORY_ID_MAP: Record<string, number> = {
  'Programming': 1,
  'Web Development': 2,
  'Database': 3,
  'Design': 4,
  'Frontend': 5,
  'Backend': 6,
  'AI / ML': 7,
  'DevOps': 8,
  'Security': 9,
  'Data': 10,
  'Mobile': 11,
  'Algorithms': 12,
  'Fullstack': 13,
  'Soft Skills': 14,
};

const LEVEL_OPTIONS = ['Beginner', 'Intermediate', 'Advanced']

const ICON_OPTIONS = [
  { emoji: '🎨', label: 'Design' },
  { emoji: '⚛️', label: 'React' },
  { emoji: '🗄️', label: 'Database' },
  { emoji: '🤖', label: 'AI' },
  { emoji: '☁️', label: 'Cloud' },
  { emoji: '🔐', label: 'Security' },
  { emoji: '📊', label: 'Data' },
  { emoji: '📱', label: 'Mobile' },
  { emoji: '🧩', label: 'Algorithms' },
  { emoji: '🛒', label: 'Ecommerce' },
  { emoji: '🎙️', label: 'Communication' },
  { emoji: '🌐', label: 'Web' },
]

interface FormErrors {
  title?: string
  category?: string
  price?: string
  lessons?: string
  description?: string
  icon?: string
  level?: string
}

export default function AddCourse() {
  const [form, setForm] = useState({
    title: '',
    category: '',
    price: '',
    lessons: '',
    description: '',
    icon: '',
    url: '',
    level: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleIconSelect = (emoji: string) => {
    setForm(prev => ({ ...prev, icon: emoji }))
    setErrors(prev => ({ ...prev, icon: undefined }))
  }

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {}
    if (!form.title.trim()) newErrors.title = 'Course title is required.'
    if (!form.category) newErrors.category = 'Please select a category.'
    if (!form.level) newErrors.level = 'Please select a level.'
    if (!form.price) newErrors.price = 'Price is required.'
    else if (Number(form.price) < 0) newErrors.price = 'Price cannot be negative.'
    if (!form.lessons) newErrors.lessons = 'Number of lessons is required.'
    else if (Number(form.lessons) < 1) newErrors.lessons = 'Must have at least 1 lesson.'
    if (!form.description.trim()) newErrors.description = 'Description is required.'
    if (!form.icon) newErrors.icon = 'Please select an icon.'
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApiError('')
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setLoading(true)
    try {
      await courseService.createCourse({
        title: form.title,
        description: form.description,
        thumbnail: form.url || 'https://images.unsplash.com/photo-1516116216624-placeholder',
        categoryId: CATEGORY_ID_MAP[form.category],
        instructorId: 1, // TODO: replace with real logged-in instructor/admin id
        price: Number(form.price),
        level: form.level,
        language: 'English', // TODO: add a real language field if needed
        isPublished: true,
      })
      setShowSuccess(true)
    } catch (err: any) {
      setApiError(err.message || 'Failed to add course.')
      console.error('Failed to add course', err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setForm({ title: '', category: '', price: '', lessons: '', description: '', icon: '', url: '', level: '' })
    setErrors({})
    setShowSuccess(false)
    setApiError('')
  }

  const inputClass = (error?: string) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all
    ${error
      ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-200'
      : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
    }`

  return (
    <AdminLayout>
      <div className="max-w-[720px]">

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Add New Course</h2>
          <p className="text-sm text-gray-500 mt-1">Fill in the details below to publish a new course.</p>
        </div>

        {apiError && (
          <div className="mb-5 px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest">Basic Information</h3>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-700">
                Course Title <span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. React & TypeScript Mastery"
                className={inputClass(errors.title)}
              />
              {errors.title && <span className="text-xs text-red-500">{errors.title}</span>}
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-gray-700">
                  Category <span className="text-red-500">*</span>
                </span>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={`${inputClass(errors.category)} bg-white cursor-pointer`}
                >
                  <option value="" disabled>Select category</option>
                  {CATEGORY_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {errors.category && <span className="text-xs text-red-500">{errors.category}</span>}
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-gray-700">
                  Price (INR) <span className="text-red-500">*</span>
                </span>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">₹</span>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="e.g. 1999"
                    min="0"
                    className={`${inputClass(errors.price)} pl-8`}
                  />
                </div>
                {errors.price && <span className="text-xs text-red-500">{errors.price}</span>}
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-gray-700">
                  Level <span className="text-red-500">*</span>
                </span>
                <select
                  name="level"
                  value={form.level}
                  onChange={handleChange}
                  className={`${inputClass(errors.level)} bg-white cursor-pointer`}
                >
                  <option value="" disabled>Select level</option>
                  {LEVEL_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {errors.level && <span className="text-xs text-red-500">{errors.level}</span>}
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-gray-700">
                  Number of Lessons <span className="text-red-500">*</span>
                </span>
                <input
                  type="number"
                  name="lessons"
                  value={form.lessons}
                  onChange={handleChange}
                  placeholder="e.g. 24"
                  min="1"
                  className={inputClass(errors.lessons)}
                />
                {errors.lessons && <span className="text-xs text-red-500">{errors.lessons}</span>}
              </label>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-700">
                Thumbnail / Course URL{' '}
                <span className="text-gray-400 font-normal">(optional)</span>
              </span>
              <input
                type="url"
                name="url"
                value={form.url}
                onChange={handleChange}
                placeholder="https://..."
                className={inputClass()}
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-700">
                Description <span className="text-red-500">*</span>
              </span>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Brief description of what students will learn..."
                rows={3}
                className={`${inputClass(errors.description)} resize-none`}
              />
              {errors.description && <span className="text-xs text-red-500">{errors.description}</span>}
            </label>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest">
              Course Icon <span className="text-red-500">*</span>
            </h3>
            <p className="text-xs text-gray-400">Select an icon that best represents this course.</p>

            <div className="grid grid-cols-6 gap-3">
              {ICON_OPTIONS.map(({ emoji, label }) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleIconSelect(emoji)}
                  title={label}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all duration-150 cursor-pointer
                    ${form.icon === emoji
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50'
                    }`}
                >
                  <span className="text-2xl">{emoji}</span>
                  <span className="text-[0.6rem] text-gray-500 font-medium">{label}</span>
                </button>
              ))}
            </div>
            {errors.icon && <span className="text-xs text-red-500">{errors.icon}</span>}

            {form.icon && (
              <div className="flex items-center gap-3 mt-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-2xl">{form.icon}</span>
                <div>
                  <p className="text-xs text-gray-500">Selected icon preview</p>
                  <p className="text-sm font-medium text-gray-900">{form.title || 'Course title'}</p>
                  {form.price && (
                    <p className="text-xs text-green-600 font-semibold mt-0.5">
                      ₹{Number(form.price).toLocaleString('en-IN')}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

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
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Publishing...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Publish Course
                </>
              )}
            </button>
          </div>

        </form>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-2xl p-8 max-w-[380px] w-full text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Course Published!</h3>
            <p className="text-sm text-gray-500 mb-1">
              <span className="font-medium text-gray-700">{form.title}</span> has been successfully added to the platform.
            </p>
            <p className="text-sm text-green-600 font-semibold mb-6">
              ₹{Number(form.price).toLocaleString('en-IN')}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm font-medium text-gray-600 transition-colors cursor-pointer"
              >
                Add another
              </button>
              <Link
                to="/admin/courses"
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-500 hover:to-purple-400 text-white text-sm font-semibold transition-all text-center"
              >
                View courses
              </Link>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  )
}
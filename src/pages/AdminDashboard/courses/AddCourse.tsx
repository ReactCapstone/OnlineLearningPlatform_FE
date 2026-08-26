import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/layout/AdminLayout/AdminLayout'
import Modal from '../../../components/common/Modal/Modal'
import CourseThumbnail from '../../../components/common/CourseThumbnail'
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

// `custom` marks icons the admin uploaded in this session, so removing one also drops it from the grid.
type IconOption = { id: string; label: string; type: 'emoji' | 'image'; value: string; custom?: boolean }

const ICON_OPTIONS_INITIAL: IconOption[] = [
  { id: 'design', label: 'Design', type: 'emoji', value: '🎨' },
  { id: 'react', label: 'React', type: 'emoji', value: '⚛️' },
  { id: 'database', label: 'Database', type: 'emoji', value: '🗄️' },
  { id: 'ai', label: 'AI', type: 'emoji', value: '🤖' },
  { id: 'cloud', label: 'Cloud', type: 'emoji', value: '☁️' },
  { id: 'security', label: 'Security', type: 'emoji', value: '🔐' },
  { id: 'data', label: 'Data', type: 'emoji', value: '📊' },
  { id: 'mobile', label: 'Mobile', type: 'emoji', value: '📱' },
  { id: 'algorithms', label: 'Algorithms', type: 'emoji', value: '🧩' },
  { id: 'ecommerce', label: 'Ecommerce', type: 'emoji', value: '🛒' },
  { id: 'communication', label: 'Communication', type: 'emoji', value: '🎙️' },
  { id: 'web', label: 'Web', type: 'emoji', value: '🌐' },
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

// Top-to-bottom field order, so a failed submit reports and focuses the *first* problem on the page.
const FIELD_ORDER: (keyof FormErrors)[] = ['title', 'category', 'price', 'level', 'lessons', 'description', 'icon']

type Toast = { type: 'error' | 'success'; message: string }

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

  const [toast, setToast] = useState<Toast | null>(null)

  const [icons, setIcons] = useState<IconOption[]>(ICON_OPTIONS_INITIAL)
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const formRef = React.useRef<HTMLFormElement | null>(null)
  const iconSectionRef = React.useRef<HTMLDivElement | null>(null)

  const selectedIcon = icons.find(i => i.value === form.icon)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 6000)
    return () => clearTimeout(timer)
  }, [toast])

  // Brings the first invalid field into view, so a blocked submit is never silent.
  const revealFirstError = (validationErrors: FormErrors) => {
    const field = FIELD_ORDER.find(name => validationErrors[name])
    if (!field) return

    if (field === 'icon') {
      iconSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    const element = formRef.current?.elements.namedItem(field) as HTMLElement | null
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    element?.focus({ preventScroll: true })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleIconSelect = (option: IconOption) => {
    // set either emoji or image data URL as the icon value
    setForm(prev => ({ ...prev, icon: option.value }))
    setErrors(prev => ({ ...prev, icon: undefined }))
  }

  // Clears the icon selection. A session upload is also dropped from the grid, since
  // removing it is the only way to undo the upload.
  const handleRemoveIcon = () => {
    if (selectedIcon?.custom) {
      setIcons(prev => prev.filter(i => i.id !== selectedIcon.id))
    }
    setForm(prev => ({ ...prev, icon: '' }))
    setApiError('')
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const readFileAsDataUrl = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    // Reset the input so removing an icon and re-picking the same file still fires a change event.
    e.target.value = ''
    if (!f) return
    // Accept only images
    const allowed = ['image/png', 'image/jpeg', 'image/svg+xml']
    if (!allowed.includes(f.type)) {
      setApiError('Only PNG, JPG and SVG images are allowed for icons.')
      return
    }

    try {
      const dataUrl = await readFileAsDataUrl(f)
      const id = `uploaded-${Date.now()}`
      const newIcon: IconOption = { id, label: f.name, type: 'image', value: dataUrl, custom: true }
      setIcons(prev => [newIcon, ...prev])
      // select uploaded icon
      setForm(prev => ({ ...prev, icon: dataUrl }))
      setErrors(prev => ({ ...prev, icon: undefined }))
      setApiError('')
    } catch (err) {
      setApiError('Failed to read uploaded file.')
      console.error(err)
    }
  }

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {}
    if (!form.title.trim()) newErrors.title = 'Course title is required.'
    if (!form.category) newErrors.category = 'Please select a category.'
    if (!form.level) newErrors.level = 'Please select a level.'
    if (!form.price) newErrors.price = 'Price is required.'
    else if (Number(form.price) < 0) newErrors.price = 'Price cannot be negative.'
    // if (!form.lessons) newErrors.lessons = 'Number of lessons is required.'
    // else if (Number(form.lessons) < 1) newErrors.lessons = 'Must have at least 1 lesson.'
    if (!form.description.trim()) newErrors.description = 'Description is required.'
    // A thumbnail URL is an equally valid icon source, so only block when neither is set.
    if (!form.icon && !form.url.trim()) newErrors.icon = 'Please select an icon or provide a thumbnail URL.'
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
<<<<<<< Updated upstream
=======
    // Icon values can be long data URLs — truncate so the log stays readable.
    // console.log('[AddCourse] Publish submitted', { ...form, icon: form.icon ? `${form.icon.slice(0, 32)}…` : '' })

>>>>>>> Stashed changes
    setApiError('')
    setToast(null)

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      const firstField = FIELD_ORDER.find(name => validationErrors[name])
      const count = Object.keys(validationErrors).length
      setToast({
        type: 'error',
        message: count > 1
          ? `${count} fields need attention. ${firstField ? validationErrors[firstField] : ''}`
          : validationErrors[firstField!]!,
      })
      revealFirstError(validationErrors)
      console.warn('[AddCourse] Submit blocked by validation', validationErrors)
      return
    }

    setLoading(true)
    try {
      // Persist the selected emoji, uploaded image, or optional URL as the course thumbnail
      const thumbnail = form.icon || form.url || '📘'

      await courseService.createCourse({
        title: form.title,
        description: form.description,
        thumbnail,
        categoryId: CATEGORY_ID_MAP[form.category],
        instructorId: 1, // TODO: replace with real logged-in instructor/admin id
        price: Number(form.price),
        level: form.level,
        language: 'English', // TODO: add a real language field if needed
        isPublished: true,
        numberOfLessons: Number(form.lessons)
      })
      setShowSuccess(true)
    } catch (err: any) {
      const message = err.message || 'Failed to add course.'
      setApiError(message)
      setToast({ type: 'error', message })
      console.error('[AddCourse] Failed to add course', err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setForm({ title: '', category: '', price: '', lessons: '', description: '', icon: '', url: '', level: '' })
    setErrors({})
    setShowSuccess(false)
    setApiError('')
    setToast(null)
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

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>

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
{/* 
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
                  className={inputClass(errors.lessons)}
                />
                {errors.lessons && <span className="text-xs text-red-500">{errors.lessons}</span>}
              </label> */}
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

          <div ref={iconSectionRef} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest">
              Course Icon <span className="text-red-500">*</span>
            </h3>
            <p className="text-xs text-gray-400">Select an icon that best represents this course.</p>

            <div className="grid grid-cols-6 gap-3">
              {icons.map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleIconSelect(opt)}
                  title={opt.label}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all duration-150 cursor-pointer
                    ${form.icon === opt.value
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50'
                    }`}
                >
                  {opt.type === 'emoji' ? (
                    <span className="text-2xl">{opt.value}</span>
                  ) : (
                    <img src={opt.value} alt={opt.label} className="w-6 h-6 object-cover rounded" />
                  )}
                  <span className="text-[0.6rem] text-gray-500 font-medium truncate max-w-full">{opt.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/svg+xml" onChange={handleFileChange} className="sr-only" />
              <button type="button" onClick={handleUploadClick} className="px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                Upload Icon
              </button>
              <span className="text-xs text-gray-400">PNG, JPG or SVG. Uploaded icons are added to the grid and selectable.</span>
            </div>

            {form.icon && (
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <CourseThumbnail
                    src={form.icon}
                    alt="Selected course icon"
                    className="w-12 h-12 rounded-xl overflow-hidden bg-white border-2 border-indigo-500 text-2xl"
                    imageClassName="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveIcon}
                    title="Remove icon"
                    aria-label="Remove selected icon"
                    className="absolute -top-1.5 -right-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-400 shadow-sm hover:bg-red-500 hover:border-red-500 hover:text-white transition-colors cursor-pointer"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-700">Selected icon</p>
                  <p className="text-[0.7rem] text-gray-400 truncate">
                    {selectedIcon ? selectedIcon.label : 'Custom icon'}
                  </p>
                </div>
              </div>
            )}

            {errors.icon && <span className="text-xs text-red-500">{errors.icon}</span>}
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

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 w-full max-w-sm"
        >
          <div
            className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-lg
              ${toast.type === 'error'
                ? 'bg-red-50 border-red-200 text-red-700'
                : 'bg-green-50 border-green-200 text-green-700'
              }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="mt-0.5 shrink-0" aria-hidden="true">
              {toast.type === 'error' ? (
                <><circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" /></>
              ) : (
                <path d="M20 6L9 17l-5-5" />
              )}
            </svg>
            <span className="flex-1">{toast.message}</span>
            <button
              type="button"
              onClick={() => setToast(null)}
              aria-label="Dismiss notification"
              className="shrink-0 text-current opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {showSuccess && (
        <Modal onClose={() => setShowSuccess(false)} ariaLabel="Course published">
          <div className="w-[min(100%,420px)] min-w-[280px] rounded-2xl bg-white p-8 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Course Published!</h3>
            <p className="text-sm text-gray-500 mb-1">
              <span className="font-medium text-gray-700">{form.title}</span> is now published and visible to learners.
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
        </Modal>
      )}

    </AdminLayout>
  )
}
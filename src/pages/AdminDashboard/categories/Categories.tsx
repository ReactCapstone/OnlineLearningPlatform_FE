import { useEffect, useState } from 'react'
import AdminLayout from '../../../components/layout/AdminLayout/AdminLayout'
import Modal from '../../../components/common/Modal/Modal'
import categoryService, { CATEGORY_OVERRIDES_STORAGE_KEY, type CategoryDto } from '../../../services/categoryService'

export default function Categories() {
  const [categories, setCategories] = useState<CategoryDto[]>([])
  const [categoryName, setCategoryName] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const loadedCategories = await categoryService.getCategories()
        const overrides = JSON.parse(localStorage.getItem(CATEGORY_OVERRIDES_STORAGE_KEY) ?? '{}') as Record<string, string>
        setCategories(loadedCategories
          .filter(category => category.name.trim().toLowerCase() !== 'string')
          .map(category => ({ ...category, name: overrides[String(category.id)] ?? category.name })))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load categories.')
      } finally {
        setLoading(false)
      }
    }

    void loadCategories()
  }, [])

  const handleSaveCategory = async () => {
    const trimmedName = categoryName.trim()
    const isEditing = editingCategoryId !== null

    if (!trimmedName || trimmedName.toLowerCase() === 'string') {
      return
    }

    const duplicateCategory = categories.find(category =>
      category.id !== editingCategoryId && category.name.trim().toLowerCase() === trimmedName.toLowerCase()
    )
    if (duplicateCategory) {
      setFeedback({ type: 'error', message: `${duplicateCategory.name} already exists.` })
      return
    }

    setSaving(true)
    setError('')
    try {
      if (isEditing) {
        const updatedCategory = await categoryService.updateCategory(editingCategoryId, trimmedName)
        setCategories(prev => prev.map(category => category.id === editingCategoryId ? { ...category, ...updatedCategory } : category))
        const overrides = JSON.parse(localStorage.getItem(CATEGORY_OVERRIDES_STORAGE_KEY) ?? '{}') as Record<string, string>
        overrides[String(editingCategoryId)] = updatedCategory.name
        localStorage.setItem(CATEGORY_OVERRIDES_STORAGE_KEY, JSON.stringify(overrides))
        setFeedback({ type: 'success', message: `${updatedCategory.name} has been updated successfully.` })
      } else {
        const createdCategory = await categoryService.createCategory(trimmedName)
        setCategories(prev => [...prev, createdCategory])
      }
      setCategoryName('')
      setEditingCategoryId(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : `Failed to ${isEditing ? 'update' : 'add'} category.`
      setError(message)
      if (isEditing) setFeedback({ type: 'error', message })
    } finally {
      setSaving(false)
    }
  }

  const handleEditCategory = (category: CategoryDto) => {
    setEditingCategoryId(category.id)
    setCategoryName(category.name)
    setError('')
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Categories</h2>
          <p className="mt-1 text-sm text-gray-500">Create and organize the categories used across your courses.</p>
        </div>

        {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}

        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <form
            onSubmit={event => {
              event.preventDefault()
              void handleSaveCategory()
            }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="category-name" className="sr-only">Category name</label>
            <input
              id="category-name"
              type="text"
              value={categoryName}
              onChange={event => setCategoryName(event.target.value)}
              placeholder="Enter category name"
              className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
            <button
              type="submit"
              disabled={!categoryName.trim() || saving}
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition-all hover:from-indigo-500 hover:to-purple-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:from-indigo-600 disabled:hover:to-purple-500"
            >
              {saving ? 'Saving...' : editingCategoryId !== null ? 'Update Category' : 'Add Category'}
            </button>
          </form>
        </section>

        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">Existing Categories</h3>
          </div>

          {loading ? (
            <p className="px-6 py-10 text-center text-sm text-gray-400">Loading categories...</p>
          ) : categories.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-gray-400">No categories added yet.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {categories.map(category => (
                <div key={category.id} className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-gray-50">
                  <span className="text-sm font-medium text-gray-800">{category.name}</span>
                  <button
                    type="button"
                    onClick={() => handleEditCategory(category)}
                    aria-label={`Edit ${category.name}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 transition-colors hover:border-indigo-600 hover:bg-indigo-600 hover:text-white"
                  >
                    <span aria-hidden="true">✏️</span>
                    Edit
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {feedback && (
        <Modal onClose={() => setFeedback(null)} ariaLabel={feedback.type === 'success' ? 'Category updated' : 'Category update error'}>
          <div className="w-[min(100%,420px)] min-w-[280px] rounded-2xl bg-white p-8 text-center shadow-2xl">
            <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${feedback.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={feedback.type === 'success' ? '#22c55e' : '#ef4444'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {feedback.type === 'success' ? <path d="M20 6L9 17l-5-5" /> : <><path d="M6 6l12 12M18 6L6 18" /></>}
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">{feedback.type === 'success' ? 'Category Updated!' : 'Update Failed'}</h3>
            <p className="text-sm text-gray-500">{feedback.message}</p>
          </div>
        </Modal>
      )}
    </AdminLayout>
  )
}

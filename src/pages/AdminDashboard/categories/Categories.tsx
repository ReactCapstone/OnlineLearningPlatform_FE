import { useState } from 'react'
import AdminLayout from '../../../components/layout/AdminLayout/AdminLayout'

const INITIAL_CATEGORIES = ['JavaScript', 'Python', 'React']

export default function Categories() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES)
  const [categoryName, setCategoryName] = useState('')

  const handleAddCategory = () => {
    const trimmedName = categoryName.trim()

    if (!trimmedName || categories.some(category => category.toLowerCase() === trimmedName.toLowerCase())) {
      return
    }

    setCategories(prev => [...prev, trimmedName])
    setCategoryName('')
  }

  const handleDeleteCategory = (categoryToDelete: string) => {
    setCategories(prev => prev.filter(category => category !== categoryToDelete))
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Categories</h2>
          <p className="mt-1 text-sm text-gray-500">Create and organize the categories used across your courses.</p>
        </div>

        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <form
            onSubmit={event => {
              event.preventDefault()
              handleAddCategory()
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
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition-all hover:from-indigo-500 hover:to-purple-400"
            >
              Add Category
            </button>
          </form>
        </section>

        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">Existing Categories</h3>
          </div>

          {categories.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-gray-400">No categories added yet.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {categories.map(category => (
                <div key={category} className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-gray-50">
                  <span className="text-sm font-medium text-gray-800">{category}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(category)}
                    aria-label={`Delete ${category}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:border-red-600 hover:bg-red-600 hover:text-white"
                  >
                    <span aria-hidden="true">🗑️</span>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  )
}

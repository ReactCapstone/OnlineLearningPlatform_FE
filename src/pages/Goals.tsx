import { useEffect, useState } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout/DashboardLayout'
import goalService, { type GoalDto } from '../services/goalService'

export default function Goals() {
  const [goals, setGoals] = useState<GoalDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    goalService.getMyGoals()
      .then(setGoals)
      .catch(err => setError(err instanceof Error ? err.message : 'Failed to load goals.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Personalized goals</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">Goals for your skills</h1>
          <p className="mt-2 text-sm text-gray-500">Only goals matching your expertise are shown.</p>
        </div>
        {loading && <p className="text-sm text-gray-500">Loading your goals...</p>}
        {error && <p className="rounded-xl bg-red-50 p-4 text-sm text-red-600">{error}</p>}
        {!loading && !error && goals.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-sm text-gray-500 shadow-sm">No goals match your current expertise.</div>
        )}
        <div className="grid gap-4 md:grid-cols-2">
          {goals.map(goal => (
            <article key={goal.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">{goal.requiredSkill}</span>
              <h2 className="mt-4 text-xl font-semibold text-gray-900">{goal.title}</h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">{goal.description}</p>
            </article>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

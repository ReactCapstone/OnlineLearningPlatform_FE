import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AdminLayout from '../../../components/layout/AdminLayout/AdminLayout'
import assessmentService from '../../../services/assessmentService'
import courseService from '../../../services/courseService'
import type { Assessment } from '../../../types/assessment'
import type { CourseDto } from '../../../types/course'

export default function ViewAssessments() {
	const { courseId } = useParams()
	const [assessments, setAssessments] = useState<Assessment[]>([])
	const [courses, setCourses] = useState<CourseDto[]>([])
	const [search, setSearch] = useState('')
	const [expandedId, setExpandedId] = useState<number | null>(null)
	const [loading, setLoading] = useState(true)
	const [deletingId, setDeletingId] = useState<number | null>(null)
	const [error, setError] = useState('')

	useEffect(() => {
		const loadAssessments = async () => {
			try {
				const courseData = await courseService.getCourses()
				const assessmentData = await Promise.all(courseData.map(async course => {
					try {
						const courseAssessments = await assessmentService.getAssessmentsByCourse(course.id)
						return courseAssessments.map(assessment => ({ ...assessment, courseId: course.id }))
					} catch (err) {
						// A course without an assessment is expected and should not stop the list.
						if (err instanceof Error && /not found/i.test(err.message)) return null
						throw err
					}
				}))
				setAssessments(assessmentData.flat().filter((assessment): assessment is Assessment & { courseId: number } => assessment !== null))
				setCourses(courseData)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to load assessments.')
			} finally {
				setLoading(false)
			}
		}

		void loadAssessments()
	}, [])

	const courseNames = useMemo(() => new Map(courses.map(course => [course.id, course.title])), [courses])
	const filteredAssessments = assessments.filter(assessment =>
		assessment.title.toLowerCase().includes(search.toLowerCase())
	)

	const visibleAssessments = courseId
		? filteredAssessments.filter(assessment => assessment.courseId === Number(courseId))
		: filteredAssessments

	const handleRemove = async (assessmentId: number) => {
		setDeletingId(assessmentId)
		setError('')
		try {
			await assessmentService.deleteAssessment(assessmentId)
			setAssessments(previous => previous.filter(assessment => assessment.id !== assessmentId))
			setExpandedId(previous => previous === assessmentId ? null : previous)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to remove assessment.')
		} finally {
			setDeletingId(null)
		}
	}

	const assessmentsByCourse = useMemo(() => {
		const groups = new Map<number, { title: string; assessments: Assessment[] }>()

		visibleAssessments.forEach(assessment => {
			const id = assessment.courseId ?? 0
			const group = groups.get(id)
			if (group) {
				group.assessments.push(assessment)
			} else {
				groups.set(id, {
					title: courseNames.get(id) ?? `Course #${id}`,
					assessments: [assessment],
				})
			}
		})

		return Array.from(groups.values())
	}, [courseNames, visibleAssessments])

	return (
		<AdminLayout>
			<div className="space-y-6">
				<div className="flex items-center justify-between gap-4">
					<div>
						<h2 className="text-2xl font-bold text-gray-900">View Assessments</h2>
						<p className="mt-1 text-sm text-gray-500">Preview published assessments, questions, and correct answers.</p>
					</div>
					<Link
						to="/admin/assessments/add"
						className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:from-indigo-500 hover:to-purple-400"
					>
						<span className="text-lg leading-none">+</span>
						Add Assessment
					</Link>
				</div>

				{error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}

				<div className="relative">
					<svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
					</svg>
					<input
						type="search"
						value={search}
						onChange={event => setSearch(event.target.value)}
						placeholder="Search assessments by title..."
						className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
					/>
				</div>

				<p className="text-sm text-gray-500">
					Showing <strong className="text-gray-900">{visibleAssessments.length}</strong> assessment{visibleAssessments.length !== 1 ? 's' : ''}
				</p>

				<div className="space-y-4">
					{loading ? (
						<div className="rounded-2xl border border-gray-100 bg-white py-16 text-center text-sm text-gray-400 shadow-sm">Loading assessments...</div>
					) : visibleAssessments.length === 0 ? (
						<div className="rounded-2xl border border-gray-100 bg-white py-16 text-center shadow-sm">
							<p className="text-sm text-gray-400">No assessments found.</p>
							<Link to="/admin/assessments/add" className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500">Create an assessment</Link>
						</div>
					) : assessmentsByCourse.map(course => (
						<section key={course.title} className="space-y-3">
							<div className="flex items-center gap-3 px-1">
								<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
									</svg>
								</div>
								<div>
									<h3 className="text-base font-bold text-gray-900">{course.title}</h3>
									<p className="text-xs text-gray-500">{course.assessments.length} assessment{course.assessments.length !== 1 ? 's' : ''}</p>
								</div>
							</div>
							<div className="space-y-3 sm:pl-12">
							{course.assessments.map(assessment => {
								const isExpanded = expandedId === assessment.id
								return (
							<section key={assessment.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
								<div className="flex items-center gap-4 px-6 py-5 transition-colors hover:bg-gray-50">
									<button
										type="button"
										onClick={() => setExpandedId(isExpanded ? null : assessment.id)}
										className="flex min-w-0 flex-1 items-center justify-between gap-4 text-left"
										aria-expanded={isExpanded}
									>
									<div className="min-w-0">
										<h3 className="truncate text-base font-bold text-gray-900">{assessment.title}</h3>
										<div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
											<span>{assessment.totalQuestions || assessment.questions.length} questions</span>
											<span>{assessment.timeLimitMinutes} min</span>
											<span>Pass at {assessment.passPercentage}%</span>
																						<span>{assessment.maxAttempts === 0 ? 'Unlimited attempts' : `${assessment.maxAttempts} attempt${assessment.maxAttempts !== 1 ? 's' : ''}`}</span>
										</div>
									</div>
										<span className="shrink-0 text-xl text-indigo-600">{isExpanded ? '−' : '+'}</span>
									</button>
									<button
										type="button"
										onClick={() => void handleRemove(assessment.id)}
										disabled={deletingId === assessment.id}
										aria-label={`Remove ${assessment.title}`}
										className="shrink-0 rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-wait disabled:opacity-50"
									>
										<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
											<polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
										</svg>
									</button>
								</div>

								{isExpanded && (
									<div className="border-t border-gray-100 bg-gray-50/70 px-6 py-5">
										<div className="space-y-4">
											{assessment.questions.map((question, index) => (
												<div key={question.id} className="rounded-xl border border-gray-100 bg-white p-5">
													<p className="text-sm font-semibold text-gray-900">
														<span className="mr-2 text-indigo-600">Q{index + 1}</span>{question.questionText}
													</p>
													<div className="mt-4 grid gap-2 sm:grid-cols-2">
														{question.options.map((option, optionIndex) => (
															<div key={option.id} className={`flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm ${option.isCorrect ? 'border-green-200 bg-green-50 text-green-800' : 'border-gray-100 bg-gray-50 text-gray-600'}`}>
																<span className="font-semibold">{String.fromCharCode(65 + optionIndex)}.</span>
																<span className="flex-1">{option.optionText}</span>
																{option.isCorrect && <span className="text-xs font-bold text-green-600">Correct</span>}
															</div>
														))}
													</div>
												</div>
											))}
										</div>
									</div>
								)}
								</section>
								)
							})}
							</div>
						</section>
					))}
				</div>
			</div>
		</AdminLayout>
	)
}

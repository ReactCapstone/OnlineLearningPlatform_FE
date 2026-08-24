// src/pages/Certificate.tsx

import { useEffect, useState } from 'react'
import { Award, Download, CheckCircle2 } from 'lucide-react'
import jsPDF from 'jspdf'
import DashboardLayout from '../components/layout/DashboardLayout/DashboardLayout'
import CourseThumbnail from '../components/common/CourseThumbnail'
import { useAppSelector } from '../redux/hooks'
import { selectAuthUser } from '../redux/auth/authSelectors'
import courseService from '../services/courseService'
import assessmentService from '../services/assessmentService'
import type { SubmitResult } from '../types/assessment'

interface CompletedCourse {
  id: number
  title: string
  level: string
  thumbnail: string
  completedOn: string // formatted display date
  submittedAtIso: string
  score: number
}

export default function Certificate() {
  const user = useAppSelector(selectAuthUser)
  const studentName = user?.fullName ?? 'Learner'

  const [completedCourses, setCompletedCourses] = useState<CompletedCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [generatingId, setGeneratingId] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false

    const loadCompletedCourses = async () => {
      try {
        setLoading(true)
        setError(null)

        const allCourses = await courseService.getCourses()
        const publishedCourses = allCourses.filter((c) => c.isPublished)

        const statusResults = await Promise.all(
          publishedCourses.map(async (course) => {
            try {
              const status = await assessmentService.getMyStatus(course.id)
              return { course, result: status.latestResult as SubmitResult | null }
            } catch {
              // No assessment for this course, or the call failed — treat as not completed
              return { course, result: null }
            }
          })
        )

        if (cancelled) return

        const passed: CompletedCourse[] = statusResults
          .filter(({ result }) => result && result.isPassed)
          .map(({ course, result }) => ({
            id: course.id,
            title: course.title,
            level: course.level,
            thumbnail: course.thumbnail,
            completedOn: new Date(result!.submittedAt).toLocaleDateString(undefined, {
              dateStyle: 'long',
            }),
            submittedAtIso: result!.submittedAt,
            score: result!.score,
          }))

        setCompletedCourses(passed)
      } catch (err: any) {
        if (!cancelled) setError(err.message || 'Failed to load certificates.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadCompletedCourses()
    return () => {
      cancelled = true
    }
  }, [])

  const generateCertificatePdf = (course: CompletedCourse) => {
    const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()

    doc.setDrawColor(79, 70, 229)
    doc.setLineWidth(6)
    doc.rect(20, 20, pageWidth - 40, pageHeight - 40)

    doc.setDrawColor(168, 85, 247)
    doc.setLineWidth(1.5)
    doc.rect(32, 32, pageWidth - 64, pageHeight - 64)

    doc.setTextColor(79, 70, 229)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.text('NV LEARN HUB', pageWidth / 2, 90, { align: 'center' })

    doc.setTextColor(30, 30, 30)
    doc.setFontSize(28)
    doc.text('Certificate of Completion', pageWidth / 2, 140, { align: 'center' })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(12)
    doc.text('This certificate is proudly presented to', pageWidth / 2, 180, { align: 'center' })

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(26)
    doc.setTextColor(79, 70, 229)
    doc.text(studentName, pageWidth / 2, 220, { align: 'center' })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(12)
    doc.setTextColor(30, 30, 30)
    doc.text('for successfully completing the course', pageWidth / 2, 250, { align: 'center' })

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.text(course.title, pageWidth / 2, 280, { align: 'center' })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.text(`Completed on ${course.completedOn} • Score: ${course.score}%`, pageWidth / 2, 310, { align: 'center' })

    const pdfBlob = doc.output('blob')
    const url = URL.createObjectURL(pdfBlob)
    window.open(url, '_blank')
  }

  const handleGetCertificate = (course: CompletedCourse) => {
    setGeneratingId(course.id)
    setTimeout(() => {
      generateCertificatePdf(course)
      setGeneratingId(null)
    }, 150)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-indigo-600">My Certificates</p>
              <h1 className="mt-2 text-2xl font-bold text-gray-900">Completed Courses</h1>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-700">
                Earned {completedCourses.length}
              </p>
            </div>
          </div>
        </div>

        {loading && (
          <div className="rounded-3xl border border-gray-200 bg-white p-16 shadow-sm text-center text-gray-500">
            Loading certificates...
          </div>
        )}

        {error && !loading && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && completedCourses.length === 0 && (
          <div className="rounded-3xl border border-gray-200 bg-white p-16 shadow-sm text-center">
            <p className="text-2xl font-semibold text-gray-900">No certificates yet</p>
            <p className="mt-3 text-sm text-gray-500">Pass a course assessment to earn your first certificate.</p>
          </div>
        )}

        {!loading && !error && completedCourses.length > 0 && (
          <div className="grid gap-6 md:grid-cols-3">
            {completedCourses.map((course) => (
              <div
                key={course.id}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5"
              >
                <CourseThumbnail
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-40 w-full bg-indigo-50"
                  imageClassName="h-full w-full object-cover"
                />

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div>
                    <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-indigo-700">
                      {course.level}
                    </span>
                    <h2 className="mt-4 text-xl font-semibold text-gray-900">{course.title}</h2>
                    <div className="mt-3 flex items-center gap-1.5 text-sm text-gray-500">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      Completed on {course.completedOn} • Scored {course.score}%
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleGetCertificate(course)}
                    disabled={generatingId === course.id}
                    className="mt-auto flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-600/30 transition hover:opacity-90 disabled:opacity-60"
                  >
                    <Award className="h-4 w-4" />
                    {generatingId === course.id ? 'Preparing…' : 'Get Certificate'}
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
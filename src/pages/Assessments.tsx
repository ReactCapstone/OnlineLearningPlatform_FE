import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout/DashboardLayout';
import courseService from '../services/courseService';
import type { CourseDto } from '../services/courseService';
import assessmentService from '../services/assessmentService';
import type { MyStatusData } from '../types/assessment';

export default function Assessments() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState<CourseDto[]>([]);
  const [statuses, setStatuses] = useState<Record<number, MyStatusData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadCoursesAndStatuses = async () => {
      try {
        setLoading(true);
        setError(null);

        // Only published courses should have quizzes offered to students
        const allCourses = await courseService.getCourses();
        const publishedCourses = allCourses.filter((c) => c.isPublished);

        if (cancelled) return;
        setCourses(publishedCourses);

        // Fetch this user's assessment status for every published course in parallel
        const entries = await Promise.all(
          publishedCourses.map(async (course) => {
            try {
              const status = await assessmentService.getMyStatus(course.id);
              return [course.id, status] as const;
            } catch {
              // If a course has no assessment yet, or the status call fails,
              // treat it as "not attempted" rather than blocking the whole page.
              return [course.id, { hasAttempted: false, attemptId: null, result: null }] as const;
            }
          })
        );

        if (!cancelled) {
          setStatuses(Object.fromEntries(entries));
        }
      } catch (err: any) {
        if (!cancelled) setError(err.message || 'Failed to load assessments.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadCoursesAndStatuses();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleStartQuiz = (courseId: number) => {
    navigate(`/quiz/${courseId}`);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, { dateStyle: 'medium' });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-indigo-600">Assessment</p>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">Knowledge Quiz</h1>
              <p className="mt-3 text-gray-600">
                Test your knowledge across different topics and track your progress.
              </p>
            </div>
            <div className="rounded-2xl bg-indigo-50 px-6 py-4 text-right">
              <p className="text-sm font-medium text-indigo-700">Total Topics</p>
              <p className="text-3xl font-bold text-indigo-900">{courses.length}</p>
            </div>
          </div>
        </div>

        {loading && (
          <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center text-gray-500">
            Loading assessments...
          </div>
        )}

        {error && !loading && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => {
              const status = statuses[course.id];
              const completed = status?.hasAttempted;

              return (
                <div
                  key={course.id}
                  className="flex flex-col gap-4 rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-indigo-700">
                      {course.level}
                    </span>
                    {completed && (
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-emerald-700">
                        Completed
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{course.title}</h3>
                    {completed && status.result ? (
                      <p className="mt-1 text-sm text-slate-500">
                        Scored {status.result.score}% • {formatDate(status.result.submittedAt)}
                      </p>
                    ) : (
                      <p className="mt-1 text-sm text-slate-500 line-clamp-2">{course.description}</p>
                    )}
                  </div>

                  <div className="border-t border-slate-200 pt-4 mt-auto flex items-center justify-end">
                    <button
                      onClick={() => handleStartQuiz(course.id)}
                      className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition active:scale-95 ${completed ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                    >
                      {completed ? 'View Results' : 'Start Quiz'}
                    </button>
                  </div>
                </div>
              );
            })}

            {courses.length === 0 && (
              <div className="col-span-full rounded-3xl border border-gray-200 bg-white p-12 text-center text-gray-500">
                No assessments available right now.
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
import { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout/DashboardLayout';
import Footer from '../components/Footer';
import progressService, { type UserCourseProgressDto } from '../services/progressService';

const stats = [
  { label: 'Courses completed', value: '12', note: '+2 this month' },
  { label: 'Learning streak', value: '6 days', note: 'Keep it going' },
  { label: 'Hours studied', value: '48h', note: '+8h this week' },
];

const milestones = [
  'Completed 3 quizzes this month',
  'Earned 2 badges from weekly challenges',
  'Booked a live mentorship session',
];

export default function Progress() {
  const [courses, setCourses] = useState<UserCourseProgressDto[]>([]);
  const [overallCompletion, setOverallCompletion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await progressService.getMyProgress();
        setCourses(data.courses);
        setOverallCompletion(data.overallCompletionPercentage);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load progress');
      } finally {
        setLoading(false);
      }
    };

    void loadProgress();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <section className="rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-500 p-8 text-white shadow-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-indigo-100">
                My progress
              </p>
              <h1 className="text-3xl font-bold sm:text-4xl">
                You are making strong progress across your learning path.
              </h1>
              <p className="mt-3 text-sm text-indigo-100 sm:text-base">
                Stay consistent and finish the next milestone to unlock your next certificate.
              </p>
            </div>
            <div className="rounded-2xl bg-white/15 px-5 py-4 backdrop-blur-sm">
              <p className="text-sm text-indigo-100">Overall completion</p>
              <p className="mt-1 text-4xl font-bold">{overallCompletion}%</p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
              <p className="mt-1 text-sm text-emerald-600">{item.note}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">Current courses</p>
                <h2 className="text-xl font-semibold text-slate-900">Learning momentum</h2>
              </div>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600">
                On track
              </span>
            </div>

            <div className="mt-6 space-y-5">
              {loading ? (
                <p className="text-sm text-slate-500">Loading your courses...</p>
              ) : error ? (
                <p className="text-sm text-rose-600">{error}</p>
              ) : courses.length === 0 ? (
                <p className="text-sm text-slate-500">No in-progress courses found.</p>
              ) : (
                courses.map((course) => (
                  <div key={course.enrollmentId}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <p className="font-medium text-slate-800">{course.courseTitle}</p>
                      <p className="text-sm text-slate-500">{course.progressPercentage}%</p>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-100">
                      <div
                        className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                        style={{ width: `${course.progressPercentage}%` }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                      {course.completedLessons} / {course.totalLessons} lessons • Current: {course.currentLessonTitle}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">Upcoming milestones</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">Keep the streak alive</h2>
            <ul className="mt-6 space-y-4">
              {milestones.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-indigo-500" />
                  <span className="text-sm text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}

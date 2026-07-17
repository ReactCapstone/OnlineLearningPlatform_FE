import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout/DashboardLayout';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  fetchMyStatus,
  fetchAssessmentByCourse,
  startAssessmentAttempt,
  submitAssessmentAttempt,
  resetAssessment,
} from '../redux/assessment/assessmentSlice';
import {
  selectAssessment,
  selectAttempt,
  selectAssessmentResult,
  selectMyStatus,
  selectAssessmentLoading,
  selectAssessmentStatusLoading,
  selectAssessmentSubmitting,
  selectAssessmentError,
} from '../redux/assessment/assessmentSelectors';
// import { fetchCourses } from '../redux/courses/courseSlice';
// import { selectAllCourses } from '../redux/courses/courseSelectors';

type AnswerState = Record<number, number>;

const Quiz = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useAppDispatch();

  const assessment = useAppSelector(selectAssessment);
  const attempt = useAppSelector(selectAttempt);
  const result = useAppSelector(selectAssessmentResult);
  const myStatus = useAppSelector(selectMyStatus);
  const loading = useAppSelector(selectAssessmentLoading);
  const statusLoading = useAppSelector(selectAssessmentStatusLoading);
  const submitting = useAppSelector(selectAssessmentSubmitting);
  const error = useAppSelector(selectAssessmentError);
  // const allCourses = useAppSelector(selectAllCourses);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [attemptStartFailed, setAttemptStartFailed] = useState(false);

  // Step 1: check status first — this decides everything downstream
  useEffect(() => {
    if (!courseId) return;
    dispatch(resetAssessment());
    setAttemptStartFailed(false);
    dispatch(fetchMyStatus(Number(courseId)));

    // if (allCourses.length === 0) {
    //   dispatch(fetchCourses());
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, dispatch]);

  // Step 2: only fetch the assessment (to take it) if the user hasn't already attempted it
  useEffect(() => {
    if (myStatus && !myStatus.hasAttempted && courseId) {
      dispatch(fetchAssessmentByCourse(Number(courseId)));
    }
  }, [myStatus, courseId, dispatch]);

  // Step 3: start the attempt only once we have a fresh assessment and confirmed no prior attempt
  useEffect(() => {
    if (myStatus && !myStatus.hasAttempted && assessment && !attempt) {
      dispatch(startAssessmentAttempt(assessment.id)).then((action) => {
        // If the start call was rejected, flag it so we can show a real error
        // instead of silently letting the user fill out a quiz with no attempt to submit.
        if (startAssessmentAttempt.rejected.match(action)) {
          setAttemptStartFailed(true);
        }
      });
    }
  }, [myStatus, assessment, attempt, dispatch]);

  const questions = assessment?.questions ?? [];
  const currentQuestion = questions[currentIndex];
  const progressPercent = questions.length ? ((currentIndex + 1) / questions.length) * 100 : 0;

  // The result to display: either freshly submitted, or the past completed one from my-status
  const displayResult = result ?? myStatus?.result ?? null;

  // const course = allCourses.find((c) => c.id === Number(courseId));
  const course = { title: undefined };
  const breadcrumbName = course?.title ?? assessment?.title ?? courseId;
  const allQuestionsAnswered = questions.every((q) => answers[q.id] !== undefined);
  const currentQuestionAnswered = currentQuestion ? answers[currentQuestion.id] !== undefined : false;

  const handleSelect = (optionId: number) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!attempt) {
      alert('Your attempt session was not started correctly. Please go back and try again.');
      return;
    }
    const payload = {
      attemptId: attempt.attemptId,
      answers: Object.entries(answers).map(([questionId, selectedOptionId]) => ({
        questionId: Number(questionId),
        selectedOptionId,
      })),
    };
    await dispatch(submitAssessmentAttempt(payload));
  };

  const handleBackToCourses = () => {
    navigate('/assessments');
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });

  // ── Loading states ──────────────────────────────────────────────────
  if (statusLoading || (myStatus?.hasAttempted === false && loading && !assessment)) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-gray-700">Loading assessment...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error && !myStatus) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-600 shadow-sm">
          {error}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleBackToCourses}
              className="rounded-xl border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Back to Assessments
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Already attempted, but we don't have the questions loaded (we intentionally never fetch
  // them in this case) — show the completed summary using myStatus.result only.
  if (myStatus?.hasAttempted && displayResult) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <button
              type="button"
              onClick={handleBackToCourses}
              className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Assessments
            </button>
            <p className="text-xs text-gray-400">
              Home &gt; Quiz &gt; <span className="font-medium text-gray-600">{breadcrumbName}</span>
            </p>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600 mt-2">Assessment</p>
            <h1 className="text-2xl font-bold text-gray-900">{breadcrumbName}</h1>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Results</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              You scored {displayResult.correctAnswers} / {displayResult.totalQuestions}
            </h2>
            <p className="mt-2 text-gray-600">
              {displayResult.isPassed
                ? `Great job! You passed with ${displayResult.score}% (needed ${displayResult.passPercentage}%).`
                : `You scored ${displayResult.score}%, just short of the ${displayResult.passPercentage}% needed to pass.`}
            </p>
            <p className="mt-3 text-sm text-gray-400">
              Submitted on {formatDate(displayResult.submittedAt)}
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={handleBackToCourses}
                className="rounded-xl border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Back to Assessments
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Just submitted in this session — we DO have questions/answers, show full review
  if (displayResult && assessment) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <button
              type="button"
              onClick={handleBackToCourses}
              className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Assessments
            </button>
            <p className="text-xs text-gray-400">
              Home &gt; Quiz &gt; <span className="font-medium text-gray-600">{breadcrumbName}</span>
            </p>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600 mt-2">Assessment</p>
            <h1 className="text-2xl font-bold text-gray-900">{assessment.title}</h1>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Results</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              You scored {displayResult.correctAnswers} / {displayResult.totalQuestions}
            </h2>
            <p className="mt-2 text-gray-600">
              {displayResult.isPassed
                ? `Great job! You passed with ${displayResult.score}% (needed ${displayResult.passPercentage}%).`
                : `You scored ${displayResult.score}%, just short of the ${displayResult.passPercentage}% needed to pass.`}
            </p>
            <p className="mt-3 text-sm text-gray-400">
              Submitted on {formatDate(displayResult.submittedAt)}
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={handleBackToCourses}
                className="rounded-xl border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Back to Assessments
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Your answers</h3>
            <div className="mt-5 space-y-4">
              {questions.map((question, index) => {
                const selectedOptionId = answers[question.id];
                const selectedOption = question.options.find((o) => o.id === selectedOptionId);
                return (
                  <div key={question.id} className="rounded-xl border border-gray-200 p-4">
                    <p className="font-semibold text-gray-900">{index + 1}. {question.questionText}</p>
                    <p className="mt-2 text-sm text-gray-600">
                      Your answer: <span className="font-medium">{selectedOption?.optionText ?? 'Not answered'}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!assessment || !currentQuestion) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-gray-700">No assessment available for this course.</p>
        </div>
      </DashboardLayout>
    );
  }

  // Assessment loaded, but the "start attempt" call failed (e.g. "You already have an
  // active attempt") — block quiz-taking entirely instead of letting the user fill out
  // questions that can never be submitted.
  if (!attempt && attemptStartFailed) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center text-amber-700 shadow-sm">
          <p className="font-semibold">Unable to start your attempt for this assessment.</p>
          {error && <p className="mt-2 text-sm">{error}</p>}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleBackToCourses}
              className="rounded-xl border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Back to Assessments
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Attempt hasn't started yet and hasn't failed either — still in flight
  if (!attempt) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-gray-700">Starting your attempt...</p>
        </div>
      </DashboardLayout>
    );
  }

  // ── Taking the quiz (fresh attempt) ─────────────────────────────────
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex-1">
            <button
              type="button"
              onClick={handleBackToCourses}
              className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Assessments
            </button>
            <p className="text-xs text-gray-400">
              Home &gt; Quiz &gt; <span className="font-medium text-gray-600">{breadcrumbName}</span>
            </p>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600 mt-2">Assessment</p>
            <h1 className="text-2xl font-bold text-gray-900">{assessment.title}</h1>
            <p className="mt-1 text-sm text-gray-500">
              {assessment.totalQuestions} questions • {assessment.timeLimitMinutes} min • Pass at {assessment.passPercentage}%
            </p>
          </div>
          <div className="rounded-2xl bg-indigo-50 px-4 py-3 text-right">
            <p className="text-sm font-medium text-indigo-700">Progress</p>
            <p className="text-xl font-semibold text-indigo-900">{currentIndex + 1} / {questions.length}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-500">Question {currentIndex + 1}</p>
              <h2 className="mt-1 text-xl font-semibold text-gray-900">{currentQuestion.questionText}</h2>
            </div>
            <div className="w-40">
              <div className="mb-2 h-2 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full rounded-full bg-indigo-500" style={{ width: `${progressPercent}%` }} />
              </div>
              <p className="text-right text-sm text-gray-500">{Math.round(progressPercent)}% complete</p>
            </div>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelect(option.id)}
                  className={`flex w-full items-start rounded-xl border px-4 py-3 text-left transition ${isSelected
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:bg-gray-50'
                    }`}
                >
                  <span className={`mr-3 mt-0.5 h-5 w-5 rounded-full border ${isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'}`} />
                  <span>{option.optionText}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            {currentIndex === questions.length - 1 ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting || !allQuestionsAnswered}
                className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                title={!allQuestionsAnswered ? 'Answer all questions before finishing' : undefined}
              >
                {submitting ? 'Submitting...' : 'Finish Quiz'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                disabled={!currentQuestionAnswered}
                className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                title={!currentQuestionAnswered ? 'Select an answer to continue' : undefined}
              >
                Next
              </button>
            )}
          </div>
          {currentIndex === questions.length - 1 && !allQuestionsAnswered && (
            <p className="mt-3 text-sm text-amber-600 text-center">
              Please answer all questions before submitting.
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Quiz;
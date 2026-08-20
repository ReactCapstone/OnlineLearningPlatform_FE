import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout/DashboardLayout';
import Modal from '../components/common/Modal/Modal';
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [attemptStartFailed, setAttemptStartFailed] = useState(false);
  // Explicitly entered "taking the quiz" mode — either first attempt or a retake
  const [isTaking, setIsTaking] = useState(false);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupPassed, setPopupPassed] = useState(false);

  // Step 1: check status first
  const loadStatus = () => {
    if (!courseId) return;
    dispatch(resetAssessment());
    setAttemptStartFailed(false);
    setIsTaking(false);
    setAnswers({});
    setCurrentIndex(0);
    dispatch(fetchMyStatus(Number(courseId)));
  };

  useEffect(() => {
    loadStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, dispatch]);

  // Step 2: if there's an active (in-progress) attempt, resume it — fetch the assessment
  // and treat it as "taking the quiz" immediately, without a fresh start call.
  useEffect(() => {
    if (myStatus?.hasActiveAttempt && courseId && !assessment) {
      dispatch(fetchAssessmentByCourse(Number(courseId)));
      setIsTaking(true);
    }
  }, [myStatus, courseId, assessment, dispatch]);

  // Step 3: start the attempt once we have the assessment and are in "taking" mode
  // with no attempt started yet.
  useEffect(() => {
    if (isTaking && assessment && !attempt && !myStatus?.hasActiveAttempt) {
      dispatch(startAssessmentAttempt(assessment.id)).then((action) => {
        if (startAssessmentAttempt.rejected.match(action)) {
          setAttemptStartFailed(true);
        }
      });
    }
  }, [isTaking, assessment, attempt, myStatus, dispatch]);

  const questions = assessment?.questions ?? [];
  const currentQuestion = questions[currentIndex];
  const progressPercent = questions.length ? ((currentIndex + 1) / questions.length) * 100 : 0;

  // Result to display: freshly submitted this session, or the latest one from status
  const displayResult = result ?? myStatus?.latestResult ?? null;
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
    const action = await dispatch(submitAssessmentAttempt(payload));

    if (submitAssessmentAttempt.fulfilled.match(action)) {
      const result = action.payload;

      if (result.isPassed) {
        setPopupPassed(true);
        setPopupMessage(
          `🎉 Congratulations! You passed the assessment with ${result.score}%.`
        );
      } else {
        setPopupPassed(false);
        setPopupMessage(
          "You did not pass. You can retake the assessment."
        );
      }

      setShowResultPopup(true);
    }
  };

  // Start taking the quiz fresh — used for both the first attempt and retakes
  const handleStartOrRetake = () => {
    if (!courseId) return;
    dispatch(resetAssessment());
    setAnswers({});
    setCurrentIndex(0);
    setAttemptStartFailed(false);
    setIsTaking(true);
    dispatch(fetchAssessmentByCourse(Number(courseId)));
  };

  const handleBackToCourses = () => {
    navigate('/assessments');
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });

  // ── Loading states ──────────────────────────────────────────────────
  if (statusLoading) {
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

  // ── Results screen: no active attempt, but we have a result to show ──
  // Covers both "just submitted this session" and "previously completed, revisited"
  if (myStatus && !myStatus.hasActiveAttempt && !isTaking && displayResult) {
    const canRetake = myStatus.canRetake;
    const attemptsRemainingText =
      myStatus.maxAttempts > 0
        ? `${myStatus.attemptsRemaining ?? 0} attempt${myStatus.attemptsRemaining === 1 ? '' : 's'} remaining`
        : null;

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
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600 mt-2">Assessment</p>
            <h1 className="text-2xl font-bold text-gray-900">{assessment?.title ?? 'Quiz'}</h1>
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
            <p className="mt-1 text-xs text-gray-400">
              Attempt {myStatus.attemptCount}
              {attemptsRemainingText ? ` • ${attemptsRemainingText}` : ''}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {canRetake && (
                <button
                  type="button"
                  onClick={handleStartOrRetake}
                  className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  Retake Quiz
                </button>
              )}
              <button
                type="button"
                onClick={handleBackToCourses}
                className="rounded-xl border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Back to Assessments
              </button>
            </div>
          </div>

          {/* Per-question review only available right after submitting in this session */}
          {result && assessment && (
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
          )}
        </div>
      </DashboardLayout>
    );
  }

  // ── No prior attempt at all — show a start screen ─────────────────────
  if (myStatus && !myStatus.hasActiveAttempt && !myStatus.latestResult && !isTaking) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Assessment</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">Ready to begin?</h2>
          <p className="mt-2 text-gray-600">You haven't attempted this assessment yet.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleStartOrRetake}
              className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              Start Quiz
            </button>
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

  if (isTaking && (loading || statusLoading) && !assessment) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-gray-700">Loading assessment...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (isTaking && !assessment) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-gray-700">No assessment available for this course.</p>
        </div>
      </DashboardLayout>
    );
  }

  if (isTaking && !attempt && attemptStartFailed) {
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

  if (isTaking && !attempt) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-gray-700">Starting your attempt...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!isTaking || !assessment || !currentQuestion) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-gray-700">Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  // ── Taking the quiz ─────────────────────────────────────────────────
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
      {showResultPopup && (
        <Modal onClose={() => setShowResultPopup(false)} ariaLabel="Assessment result">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex justify-center">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full ${popupPassed ? 'bg-green-100' : 'bg-red-100'
                  }`}
              >
                {popupPassed ? (
                  <svg
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-8 w-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </div>
            </div>

            <h2 className="mt-5 text-center text-2xl font-bold text-gray-900">
              {popupPassed ? 'Congratulations!' : 'Assessment Result'}
            </h2>

            <p className="mt-3 text-center text-gray-600">
              {popupMessage}
            </p>

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => {
                  setShowResultPopup(false)
                  handleBackToCourses();
                }}
                className="rounded-xl bg-indigo-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                OK
              </button>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
};

export default Quiz;
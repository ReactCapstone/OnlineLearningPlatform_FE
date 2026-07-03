type QuizNavigationProps = {
  currentIndex: number
  onPrev: () => void
  onNext: () => void
  onSubmit: () => void
  isLastQuestion: boolean
  isCurrentAnswered: boolean
}

export default function QuizNavigation({
  currentIndex,
  onPrev,
  onNext,
  onSubmit,
  isLastQuestion,
  isCurrentAnswered,
}: QuizNavigationProps) {
  return (
    <div className="mt-8 flex flex-col gap-4 rounded-[26px] border border-slate-200 bg-slate-50 p-5 shadow-sm shadow-slate-200 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        onClick={onPrev}
        disabled={currentIndex === 0}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-indigo-300 hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        Previous
      </button>

      <div className="text-sm text-slate-600 sm:text-base">
        {isCurrentAnswered ? 'Your answer is saved.' : 'Select an answer to continue.'}
      </div>

      {isLastQuestion ? (
        <button
          type="button"
          onClick={onSubmit}
          disabled={!isCurrentAnswered}
          className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          Submit quiz
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          disabled={!isCurrentAnswered}
          className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          Next question
        </button>
      )}
    </div>
  )
}

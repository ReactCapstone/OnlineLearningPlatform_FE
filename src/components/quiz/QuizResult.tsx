type QuizResultProps = {
  score: number
  total: number
  onRestart: () => void
}

export default function QuizResult({ score, total, onRestart }: QuizResultProps) {
  const percentage = Math.round((score / total) * 100)

  return (
    <div className="mx-auto w-full rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-[0_30px_80px_rgba(148,163,184,0.12)] md:max-w-2xl">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-700">
        {percentage}%
      </div>
      <h2 className="mt-5 text-3xl font-bold text-slate-900">Quiz completed</h2>
      <p className="mt-3 text-slate-600">
        You scored <span className="font-semibold text-slate-900">{score}</span> out of <span className="font-semibold text-slate-900">{total}</span> questions correctly.
      </p>

      <button
        type="button"
        onClick={onRestart}
        className="mt-6 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
      >
        Try again
      </button>
    </div>
  )
}

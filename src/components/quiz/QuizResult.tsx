type QuizResultProps = {
  score: number
  total: number
  onRestart: () => void
}

export default function QuizResult({ score, total, onRestart }: QuizResultProps) {
  const percentage = Math.round((score / total) * 100)

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-center shadow-2xl shadow-indigo/10">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo/20 text-2xl font-bold text-indigo-light">
        {percentage}%
      </div>
      <h2 className="mt-5 text-3xl font-bold text-white-soft">Quiz completed</h2>
      <p className="mt-3 text-muted">
        You scored <span className="font-semibold text-white-soft">{score}</span> out of <span className="font-semibold text-white-soft">{total}</span> questions correctly.
      </p>

      <button
        type="button"
        onClick={onRestart}
        className="mt-6 rounded-lg bg-indigo px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-light"
      >
        Try again
      </button>
    </div>
  )
}

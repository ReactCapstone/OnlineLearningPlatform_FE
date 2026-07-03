type ProgressBarProps = {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = total > 0 ? ((current + 1) / total) * 100 : 0

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm text-muted">
        <span>Question {Math.min(current + 1, total)} of {total}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-indigo transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

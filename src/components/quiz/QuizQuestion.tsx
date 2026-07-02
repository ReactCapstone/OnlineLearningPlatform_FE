type QuizOption = {
  id: string
  text: string
}

type QuizQuestionData = {
  id: number
  question: string
  options: QuizOption[]
  correctAnswer: string
}

type QuizQuestionProps = {
  question: QuizQuestionData
  selectedAnswer: string | null
  onSelect: (answer: string) => void
}

export default function QuizQuestion({ question, selectedAnswer, onSelect }: QuizQuestionProps) {
  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
      <p className="text-lg font-semibold text-white-soft">{question.question}</p>
      <div className="mt-5 space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option.id

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={`flex w-full items-center rounded-xl border px-4 py-3 text-left text-sm transition ${
                isSelected
                  ? 'border-indigo bg-indigo/20 text-white-soft'
                  : 'border-white/10 bg-slate-950/40 text-muted hover:border-indigo/40 hover:bg-white/8'
              }`}
            >
              <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 text-xs font-semibold">
                {option.id}
              </span>
              <span>{option.text}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

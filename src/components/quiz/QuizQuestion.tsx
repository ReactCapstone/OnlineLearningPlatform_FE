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
    <div className="w-full rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-200">
      <p className="text-lg font-semibold text-slate-900">{question.question}</p>
      <div className="mt-5 space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option.id

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={`flex w-full items-center rounded-2xl border px-4 py-4 text-left text-sm transition-all duration-200 ${
                isSelected
                  ? 'border-indigo-300 bg-indigo-50 text-slate-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50'
              }`}
            >
              <span className="mr-4 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-900">
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

import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout/DashboardLayout';

interface QuizTopic {
  id: string;
  title: string;
 
  totalQuestions: number;
  category: string;
}

const QUIZ_TOPICS: QuizTopic[] = [
  {
    id: 'react-basics',
    title: 'React Basics',
  
    totalQuestions: 10,
    category: 'Frontend',
  },
  {
    id: 'javascript-fundamentals',
    title: 'JavaScript Fundamentals',
   
    totalQuestions: 15,
    category: 'Programming',
  },
  {
    id: 'web-design',
    title: 'Web Design Principles',
    
    totalQuestions: 12,
    category: 'Design',
  },
  {
    id: 'typescript',
    title: 'TypeScript Mastery',
  
    totalQuestions: 10,
    category: 'Frontend',
  },
  {
    id: 'rest-api',
    title: 'REST API Design',
  
    totalQuestions: 10,
    category: 'Backend',
  },
  {
    id: 'database-design',
    title: 'Database Design',
   
    totalQuestions: 10,
    category: 'Backend',
  },
];

export default function Assessments() {
  const navigate = useNavigate();

  const handleStartQuiz = (topicId: string) => {
    navigate(`/quiz/${topicId}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
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
              <p className="text-3xl font-bold text-indigo-900">{QUIZ_TOPICS.length}</p>
            </div>
          </div>
        </div>

        {/* Quiz Topics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {QUIZ_TOPICS.map((topic) => (
            <div
              key={topic.id}
              className="flex flex-col gap-4 rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
             

              {/* Category Tag */}
              <div>
                <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-indigo-700">
                  {topic.category}
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{topic.title}</h3>
              </div>

           

              {/* Footer with question count and button */}
              <div className="border-t border-slate-200 pt-4 mt-auto flex items-center justify-between">
                <span className="text-sm text-slate-600 font-medium">
                  {topic.totalQuestions} questions
                </span>
                <button
                  onClick={() => handleStartQuiz(topic.id)}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-95"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

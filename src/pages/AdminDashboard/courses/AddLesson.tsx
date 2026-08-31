import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AdminLayout from '../../../components/layout/AdminLayout/AdminLayout'
import Modal from '../../../components/common/Modal/Modal'

const TOOLBAR_BUTTONS = [
  { label: 'B', command: 'bold', title: 'Bold' },
  { label: 'I', command: 'italic', title: 'Italic' },
  { label: 'U', command: 'underline', title: 'Underline' },
  { label: 'S', command: 'strikeThrough', title: 'Strikethrough' },
  { label: 'H1', command: 'formatBlock', value: 'h1', title: 'Heading 1' },
  { label: 'H2', command: 'formatBlock', value: 'h2', title: 'Heading 2' },
  { label: '•', command: 'insertUnorderedList', title: 'Bulleted list' },
  { label: '1.', command: 'insertOrderedList', title: 'Numbered list' },
]

function getYouTubeVideoId(value: string) {
  try {
    const url = new URL(value)
    if (url.hostname === 'youtu.be') return url.pathname.slice(1).split('/')[0] || null
    if (url.hostname.includes('youtube.com')) {
      if (url.pathname === '/watch') return url.searchParams.get('v')
      const parts = url.pathname.split('/').filter(Boolean)
      if (parts[0] === 'embed' || parts[0] === 'shorts') return parts[1] || null
    }
  } catch {
    return null
  }
  return null
}

export default function AddLesson() {
  const { courseId } = useParams()
  const contentRef = useRef<HTMLDivElement>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [lessonType, setLessonType] = useState('Video')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<'Draft' | 'Published'>('Draft')
  const [showPreview, setShowPreview] = useState(false)

  const runCommand = (command: string, value?: string) => {
    contentRef.current?.focus()
    document.execCommand(command, false, value)
    setContent(contentRef.current?.innerHTML ?? '')
  }

  const insertLink = () => {
    const url = window.prompt('Enter URL')
    if (url) runCommand('createLink', url)
  }

  const insertImage = () => {
    const url = window.prompt('Enter image URL')
    if (url) runCommand('insertImage', url)
  }

  const videoId = lessonType === 'Video' ? getYouTubeVideoId(content.trim()) : null

  return (
    <AdminLayout>
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link to="/admin/course-lessons" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Back to Manage Course Lessons</Link>
            <h2 className="mt-3 text-2xl font-bold text-gray-900">Create New Lesson</h2>
            <p className="mt-1 text-sm text-gray-500">Add a lesson with clear, structured learning content.</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status === 'Published' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{status}</span>
        </div>

        <div className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-800">Lesson Title</span>
            <input value={title} onChange={event => setTitle(event.target.value)} placeholder="Introduction to React" className="rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-800">Lesson Description</span>
            <textarea value={description} onChange={event => setDescription(event.target.value)} rows={3} placeholder="Learn the basics of React and its features." className="resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-800">Lesson Type</span>
            <select value={lessonType} onChange={event => setLessonType(event.target.value)} className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20">
              <option>Video</option>
              <option>Article</option>
              <option>PDF</option>
              <option>Assignment</option>
            </select>
          </label>

          {lessonType === 'Article' ? (
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-800">Lesson Content</span>
              <div className="overflow-hidden rounded-xl border border-gray-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
                <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 p-2">
                  {TOOLBAR_BUTTONS.map(button => (
                    <button key={button.title} type="button" title={button.title} aria-label={button.title} onMouseDown={event => event.preventDefault()} onClick={() => runCommand(button.command, button.value)} className="min-w-8 rounded-lg px-2 py-1.5 text-sm font-semibold text-gray-600 transition hover:bg-white hover:text-indigo-600">
                      {button.label}
                    </button>
                  ))}
                  <span className="mx-1 h-6 w-px bg-gray-200" />
                  <button type="button" title="Insert link" aria-label="Insert link" onMouseDown={event => event.preventDefault()} onClick={insertLink} className="rounded-lg px-2 py-1.5 text-base text-gray-600 transition hover:bg-white hover:text-indigo-600">Link</button>
                  <button type="button" title="Insert image" aria-label="Insert image" onMouseDown={event => event.preventDefault()} onClick={insertImage} className="rounded-lg px-2 py-1.5 text-base text-gray-600 transition hover:bg-white hover:text-indigo-600">Image</button>
                  <button type="button" title="Insert code" aria-label="Insert code" onMouseDown={event => event.preventDefault()} onClick={() => runCommand('formatBlock', 'pre')} className="rounded-lg px-2 py-1.5 text-sm font-semibold text-gray-600 transition hover:bg-white hover:text-indigo-600">&lt;/&gt;</button>
                </div>
                <div ref={contentRef} contentEditable role="textbox" aria-label="Lesson content" aria-multiline="true" suppressContentEditableWarning onInput={event => setContent(event.currentTarget.innerHTML)} data-placeholder="Write your lesson content here..." className="min-h-80 p-5 text-sm leading-7 text-gray-800 outline-none empty:before:text-gray-400 empty:before:content-[attr(data-placeholder)]" />
              </div>
              <p className="text-xs text-gray-400">Use headings, lists, links, images, and code blocks to structure the article.</p>
            </div>
          ) : (
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-800">{lessonType} Content</span>
              <textarea value={content} onChange={event => setContent(event.target.value)} rows={6} placeholder={lessonType === 'Video' ? 'Enter video URL' : `Add ${lessonType.toLowerCase()} content or URL`} className="resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
            </label>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-5">
            <Link to="/admin/course-lessons" className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50">Cancel</Link>
            <div className="flex gap-3">
              <button type="button" onClick={() => setShowPreview(true)} className="rounded-xl border border-indigo-200 px-4 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50">Preview Lesson</button>
              <button type="button" onClick={() => setStatus('Draft')} className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50">Save Draft</button>
              <button type="button" onClick={() => setStatus('Published')} className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500">Publish Lesson</button>
            </div>
          </div>
        </div>
      </div>

      {showPreview && (
        <Modal onClose={() => setShowPreview(false)} ariaLabel="Lesson preview">
          <div className="max-h-[85vh] w-[min(720px,calc(100vw-2rem))] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="mb-6 border-b border-gray-100 pb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600">Student Preview</p>
              <h3 className="mt-2 text-2xl font-bold text-gray-900">{title || 'Untitled lesson'}</h3>
              <p className="mt-2 text-sm text-gray-500">{description || 'No description added yet.'}</p>
              <span className="mt-4 inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">{lessonType}</span>
            </div>
            <div className="prose max-w-none text-gray-800">
              {lessonType === 'Article' ? (
                content ? <div dangerouslySetInnerHTML={{ __html: content }} /> : <p className="text-gray-400">No article content added yet.</p>
              ) : lessonType === 'Video' ? (
                videoId ? (
                  <a href={content.trim()} target="_blank" rel="noreferrer" className="group relative block overflow-hidden rounded-xl bg-gray-900" aria-label="Open YouTube video">
                    <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt={`${title || 'Lesson'} video thumbnail`} className="aspect-video w-full object-cover transition group-hover:opacity-80" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition group-hover:scale-105" aria-hidden="true">
                        <span className="ml-1 text-2xl">▶</span>
                      </span>
                    </span>
                  </a>
                ) : (
                  <p className="text-gray-400">Enter a valid YouTube URL to preview the video thumbnail.</p>
                )
              ) : (
                <p className="whitespace-pre-wrap">{content || `No ${lessonType.toLowerCase()} content added yet.`}</p>
              )}
            </div>
            <div className="mt-8 flex justify-end border-t border-gray-100 pt-5">
              <button type="button" onClick={() => setShowPreview(false)} className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500">Back to Editor</button>
            </div>
          </div>
        </Modal>
      )}
    </AdminLayout>
  )
}

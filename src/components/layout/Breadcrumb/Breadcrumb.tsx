import { useLocation } from 'react-router-dom'

const Breadcrumb = () => {
  const location = useLocation()
  const pathLabel = location.pathname === '/dashboard/assessments' ? 'Assessment' : 'Dashboard'

  return (
    <div className="px-8 py-4 text-sm text-blue-800">
        Home
        <span className="mx-2">{'>'}</span>
        {pathLabel}
    </div>
  )
}

export default Breadcrumb;
import Footer from '../components/Footer'
import Header from '../components/layout/Header/Header'
import Sidebar from '../components/layout/Sidebar/sidebar'
import Courses from './Courses'

export default function AllCourses() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1">
          <Courses />
        </main>
        <Footer />
      </div>
    </div>
  )
}

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Courses from './pages/Courses';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      {/* Navbar (common for all pages) */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      {/* Footer (common for all pages) */}
      <Footer />
    </>
  );
}

export default App;

import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home   from './Pages/Home'
import Login  from './Pages/Login'
import Signup from './Pages/Signup'
import JobList from './company/JobList'
import ApplyList from './Pages/ApplyList'
import MCQ from "./Pages/MCQ";
import Admin from './Pages/Admin'
import Candidate from './company/Candidate'
import Interview from './company/Interview'
import Result from './Pages/Result'
function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/joblist" element={<JobList />} />

  {/* IMPORTANT */}
  <Route path="/apply/:company" element={<ApplyList />} />
  <Route path="/mcq/:company" element={<MCQ />} />

  <Route path="/admin" element={<Admin />} />
  <Route path="/candidate" element={<Candidate />} />
<Route path="/interview/:company" element={<Interview />} />
<Route path="/result" element={<Result />} />
</Routes>
                          
                          
                          

    </BrowserRouter>
  )
}

export default App
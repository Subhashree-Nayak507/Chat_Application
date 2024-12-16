import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'
import { axiosInstance } from './lib/axios'

const App = () => {
  return (
    <div >
     <Navbar />
     <Routes >
      <Route  path ="/"  element={ <HomePage/>} />
      <Route  path ="/signup"  element={ <SignUpPage/>} />
      <Route  path ="/login"  element={ <LoginPage/>} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />
     </Routes>
    </div>
  )
}

export default App

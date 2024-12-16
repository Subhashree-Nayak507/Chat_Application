import React,{useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'
import { useAuthStore } from './store/useAuthStore'
import {Loader } from 'lucide-react'

const App = () => {
  const {authUser,checkAuth} = useAuthStore();

  useEffect((
    checkAuth()
  ),[])
  console.log({authUser});
  if(isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin" />
    </div>
  )

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

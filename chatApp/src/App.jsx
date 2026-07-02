import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import { Toaster } from 'react-hot-toast'
import { AuthContext } from '../context/AuthContextObject'

const App = () => {
  const { authUser } = useContext(AuthContext)

  return (
    <div className="bg-[url('./assets/chat-app-assets/bgImage.svg')] bg-contain">
      <Toaster></Toaster>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={'/login'} />}
        />{' '}
        {/* Default route for the home page */}
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={'/'} />}
        />{' '}
        {/* Route for the login page */}
        <Route path="/profile" element={authUser ?  < ProfilePage /> : <Navigate to={'/login'} /> } />{' '}
        {/* Route for the profile page */}
      </Routes>
    </div>
  )
}

export default App

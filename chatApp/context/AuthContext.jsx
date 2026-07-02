import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { io } from 'socket.io-client'
import { AuthContext } from './AuthContextObject'

const backendUrl = import.meta.env.VITE_BACKEND_URL
const api = axios.create({ baseURL: backendUrl })

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [authUser, setAuthUser] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [socket, setSocket] = useState(null)

  // Login function to handle user authentication and socket connection
  const login = async (state, credentials) => {
    try {
      const { data } = await api.post(`/api/auth/${state}`, credentials)
      if (data.success) {
        setAuthUser(data.userData)
        connectSocket(data.userData)
        setToken(data.token)
        localStorage.setItem('token', data.token)
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Logout function to handle user logout and socket disconnection

  const logout = async () => {
    localStorage.removeItem('token')
    setToken(null)
    setAuthUser(null)
    setOnlineUsers([])
    toast.success('Logged out successfully')
    socket?.disconnect()
  }
  // update profile function to handle user profile updates

  const updateProfile = async (body) => {
    try {
      const { data } = await api.put('/api/auth/update-profile', body, {
        headers: { token },
      })
      if (data.success) {
        setAuthUser(data.user)
        toast.success('Profile updated successfully')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // connect socket function to handle socket connection and online users updates
  const connectSocket = useCallback(
    (userData) => {
      if (!userData || socket?.connected) return

      const newSocket = io(backendUrl, {
        query: {
          userId: userData._id,
        },
      })
      newSocket.connect()
      setSocket(newSocket)

      newSocket.on('getOnlineUsers', (userIds) => {
        setOnlineUsers(userIds)
      })
    },
    [socket],
  )

  useEffect(() => {
    const verifyAuth = async () => {
      if (!token) return
      try {
        const { data } = await api.get('/api/auth/check', {
          headers: { token },
        })
        if (data.success) {
          setAuthUser(data.user)
          connectSocket(data.user)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    verifyAuth()
  }, [token, connectSocket])

  const value = {
    axios: api,
    authUser,
    onlineUsers,
    socket,
    login,
    logout,
    updateProfile
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

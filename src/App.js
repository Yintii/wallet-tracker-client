import './App.css';
import React, { useEffect, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom';
import JWT from 'jsonwebtoken'
import { Home } from './components/Home';
import { Add } from './components/Add';
import { Check } from './components/Check'
import { Login } from './components/Login';
import { Routes, Route, Outlet } from "react-router-dom"
import { Logout } from './components/Logout';


function App() {


  const navigate = useNavigate()

  const [user, setUser] = useState({})

  const PrivateRoute = ({ user, redirectPath = "/login", children }) => {
    if (!user) {
      return <Navigate to={redirectPath} replace />
    }
    return children ? children : <Outlet />
  }

  const RemoveUser = () => {
    localStorage.removeItem('user')
    setUser({})
    navigate('/login')
  }

  useEffect(() => {
    const user = localStorage.getItem('user')
    setUser(user)
    if (user) {
      const authedUser = JWT.decode(user)
      if (!authedUser) {
        RemoveUser()
      }
    } else if (!user) {
      RemoveUser()
    }
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoute user={user} />} >
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/check" element={<Check />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route path="/login" element={<Login />} />

      </Routes>
    </div>
  );
}

export default App;
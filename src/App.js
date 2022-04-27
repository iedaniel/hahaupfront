import React, { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Api from './api/Api'
import Admin from './pages/admin/Admin'
import Login from './pages/login/Login'
import Main from './pages/main/Main'
import Partner from './pages/partner/Partner'
import RequireAuth from './RequireAuth'

function App() {

  const [loggedIn, setLoggedIn] = useState(null)

  const authorize = () => Api(true).get("/user/validate")
    .then(res => {
      if (res.data.success === true) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })

    useEffect(() => {
      authorize()
    }, [])

  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/partner/:username" element={<Partner />} />
        <Route path="/login" element={<Login loggedIn={loggedIn} authorize={authorize} />} />
        <Route path="/admin" element={<RequireAuth loggedIn={loggedIn} child={<Admin />}/>} />
      </Routes>
    </div>
  )
}

export default App
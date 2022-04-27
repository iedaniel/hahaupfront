import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function RequireAuth({ child, loggedIn }) {

    console.log("auth required")
    const navigate = useNavigate()
    const checkAuth = () => {
        if (loggedIn === false) {
            navigate("/", { replace: true })
        }
    }

    useEffect(() => {
        checkAuth()
    }, [loggedIn])
    return child
}

export default RequireAuth
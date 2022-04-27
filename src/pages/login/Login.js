import React, { useEffect, useState } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Api from '../../api/Api'
import Header from '../../components/header/Header'

function Login({ loggedIn, authorize }) {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const login = (evt) => {
        evt.preventDefault()
        Api(false).post("/user/login", { username, password })
            .then(res => {
                if (res.data.success === true) {
                    localStorage.setItem("auth_token", res.headers.authorization)
                    authorize()
                } else {
                    alert(res.data.message)
                }
            })
    }

    const checkAuth = () => {
        if (loggedIn === true) {
            navigate("/admin", { replace: true })
        }
    }

    useEffect(() => {
        checkAuth()
    }, [loggedIn])

    return (
        <div className='defaultPage'>
            <Header />
            <Form className='simpleForm' onSubmit={login}>
                <Form.Control value={username}
                    placeholder='Логин'
                    onChange={evt => setUsername(evt.target.value)} />
                <Form.Control value={password}
                    style={{ margin: "16px 0px" }}
                    placeholder='Пароль'
                    type='password'
                    onChange={evt => setPassword(evt.target.value)} />
                <Button type='submit'>Вход</Button>
            </Form>
        </div>
    )
}

export default Login
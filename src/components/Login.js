import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Button } from 'bootstrap-react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let response = await fetch('http://localhost:5001/api/v1/accounts/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })

            let data = await response.json()

            localStorage.setItem("user", data.user)

            navigate('/')

        } catch (error) {
            console.error(`Unable to login: `, error)
        }
    }

    return (
        <Form className="w-25 mx-auto my-5" onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Username" onChange={handleUsernameChange} required />
                <Form.Label className='mt-4'>Password</Form.Label>
                <Form.Control type="password" placeholder="GoodPassword1@4!" onChange={handlePasswordChange} required />
            </Form.Group>
            <Button type="submit" className="my-2 w-100">
                Submit
            </Button>
        </Form >
    )
}
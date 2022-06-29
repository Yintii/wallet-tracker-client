import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import JWT from 'jsonwebtoken'
import { Button } from 'react-bootstrap'

export const Home = () => {
    const navigate = useNavigate()



    useEffect(() => {
        const user = localStorage.getItem('user')
        console.log(user)
        if (user) {
            const authedUser = JWT.decode(user)
            if (!authedUser) {
                localStorage.removeItem('user')
                navigate('/login')
            }
        } else if (!user) {
            localStorage.removeItem('user')
            navigate('/login')
        }
    }, [])

    return (
        <div id="home">
            <Button class="home-btn" variant='success' onClick={() => navigate("/add")}>Add New Account</Button>
            <Button class="home-btn" variant='warning' onClick={() => navigate("/check")}>Review Accounts</Button>
            <Button class="home-btn" variant='danger' onClick={() => navigate('/logout')}>Logout</Button>
        </div>
    )
}

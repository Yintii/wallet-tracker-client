import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import JWT from 'jsonwebtoken'
import { Button } from 'react-bootstrap'

export const Home = () => {
    const navigate = useNavigate()

    return (
        <div id="home">
            <Button className="home-btn" variant='success' onClick={() => navigate("/add")}>Add New Account</Button>
            <Button className="home-btn" variant='warning' onClick={() => navigate("/check")}>Review Accounts</Button>
            <Button className="home-btn" variant='danger' onClick={() => navigate('/logout')}>Logout</Button>
        </div>
    )
}

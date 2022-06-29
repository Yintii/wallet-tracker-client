import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import JWT from 'jsonwebtoken'

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
            <Link class="option" to="/add">
                Enter new account to database
            </Link>
            <Link class="option" to="/check">
                View Accounts and wallets
            </Link>
        </div>
    )
}

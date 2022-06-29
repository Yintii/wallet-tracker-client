import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
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

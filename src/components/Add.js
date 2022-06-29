import React, { useState, useEffect } from 'react'
import { MongoClient, ServerApiVersion } from 'mongodb'
import { Button } from 'bootstrap-react'
import { useNavigate } from 'react-router-dom'
import JWT from 'jsonwebtoken'



export const Add = () => {

    const navigate = useNavigate()


    const [name, setName] = useState('')
    const [xPub, setXPub] = useState('')
    const [chain, setChain] = useState('')

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleChainChange = (e) => {
        setChain(e.target.value)
    }

    const handleXPubChange = (e) => {
        setXPub(e.target.value)
    }

    const handleSubmit = async () => {
        await fetch('http://localhost:3001/add')
            .then(response => response.json())
            .then(data => console.log(data))
    }

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
        <div id="entry">
            <label>Account name</label>
            <input type="text" placeholder="0000000" onChange={handleNameChange} />
            <label>Wallet chain</label>
            <input type="text" placeholder='ex. bitcoin' onChange={handleChainChange} />
            <label>Wallet xPub</label>
            <input type="text" placeholder='xpub address' onChange={handleXPubChange} />
            <Button variant='warning' onClick={handleSubmit}>Submit</Button>
        </div>
    )
}

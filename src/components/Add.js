import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import JWT from 'jsonwebtoken'
import { Form, Button } from 'react-bootstrap'



export const Add = () => {

    const navigate = useNavigate()
    const [accounts, setAccounts] = useState([])

    const [accountName, setAccountName] = useState('')
    const [choice, setChoice] = useState('')
    const [walletName, setWalletName] = useState('')
    const [xPub, setXPub] = useState('')
    const [chain, setChain] = useState('')



    async function getAccounts() {
        let response = await fetch('http://localhost:5001/api/v1/accounts/check')
        let data = await response.json()
        setAccounts(data.accountsList)
        setChoice(data.accountsList[0].accountName)

    }

    const handleAccountNameChange = (e) => {
        setAccountName(e.target.value)
    }
    const handleWalletNameChange = (e) => {
        setWalletName(e.target.value)
    }

    const handleChainChange = (e) => {
        setChain(e.target.value)
    }

    const handleXPubChange = (e) => {
        setXPub(e.target.value)
    }
    const handleAccountChange = (e) => {
        setChoice(e.target.value)
    }

    const handleAccountSubmit = async () => {
        let response = await fetch('http://localhost:5001/api/v1/accounts/add/account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accountName: accountName
            })
        })

        let data = await response.json()
        console.log(data)
    }

    const handleWalletSubmit = async (e) => {
        e.preventDefault()
        console.log(choice)
    }

    useEffect(() => {
        getAccounts()
    }, [])



    useEffect(() => {
        const user = localStorage.getItem('user')
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
        <div className='mx-auto w-50 my-5'>
            <h1>Add Account</h1>
            <Form className="my-5 w-75 mx-auto">
                <Form.Group>
                    <Form.Label>Account Name</Form.Label>
                    <Form.Control type="text" onChange={handleAccountNameChange} required />
                    <Button
                        variant='warning'
                        className="mt-3"
                        onClick={handleAccountSubmit}
                    >
                        Add Account
                    </Button>
                </Form.Group>
            </Form>

            <h1>Add new wallet to an existing account</h1>
            <Form className="my-5 w-75 mx-auto" onSubmit={handleWalletSubmit}>
                <Form.Group>
                    <Form.Label>Account</Form.Label>
                    <Form.Select onChange={handleAccountChange} value={choice}>
                        {accounts.map(account => {
                            return (
                                <option key={account._id} value={account.accountName}>{account.accountName}</option>
                            )
                        })}
                    </Form.Select>
                    <Form.Label>Wallet Name</Form.Label>
                    <Form.Control type="text" placeholder='My Wallet' onChange={handleWalletNameChange} required />
                    <Form.Label>Wallet Type</Form.Label>
                    <Form.Control type="text" placeholder='Btc, Bch, Eth, Sol, etc.' onChange={handleChainChange} required />
                    <Form.Label>Wallet xPub</Form.Label>
                    <Form.Control type="text" placeholder='xPub address here' onChange={handleXPubChange} required />
                    <Button
                        variant='success'
                        className="mt-3"
                        type="submit"
                    >
                        Add Wallet
                    </Button>
                </Form.Group>
            </Form>
            <Button onClick={() => navigate(-1)}>Back</Button>
        </div >
    )
}

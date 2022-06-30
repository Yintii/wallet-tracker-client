import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import JWT from 'jsonwebtoken'
import { Form, Button, Toast, ToastContainer } from 'react-bootstrap'



export const Add = () => {

    const navigate = useNavigate()
    const [accounts, setAccounts] = useState([])

    const [accountName, setAccountName] = useState('')
    const [choice, setChoice] = useState({})
    const [walletName, setWalletName] = useState('')
    const [xPub, setXPub] = useState('')
    const [chain, setChain] = useState('')

    const [walletSuccess, setWalletSuccess] = useState(false)
    const [walletFail, setWalletFail] = useState(false)
    const [accountSuccess, setAccountSuccess] = useState(false)
    const [accountFail, setAccountFail] = useState(false)

    async function getAccounts() {
        let response = await fetch('http://localhost:5001/api/v1/accounts/check')
        let data = await response.json()
        console.log(data)
        if (data.accountsList.length > 0) {
            setAccounts(data.accountsList)
            setChoice({
                id: data.accountsList[0]._id,
                name: data.accountsList[0].accountName
            })
        } else {
            setAccounts([])
            setChoice({})
        }
    }

    function showAccountId() {
        console.log(choice.id)
        console.log(choice.name)
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
    const handleChoiceChange = (e) => {
        let account = accounts.filter(each => each.accountName === e.target.value)
        let id = account[0]._id
        console.log(e.target.value)
        console.log(id)
        setChoice({
            name: e.target.value,
            id: id
        })
    }

    const handleAccountSubmit = async () => {
        //need to include an if statement to check if the account already exists
        try {
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
            setAccountSuccess(true)
            setAccountName('')
        } catch (error) {
            setAccountFail(true)
            console.error("Could not add account")
        }
    }

    const handleWalletSubmit = async (e) => {
        e.preventDefault()
        try {
            let response = await fetch('http://localhost:5001/api/v1/accounts/add/wallet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: walletName,
                    type: chain,
                    xpub: xPub,
                    account_id: choice.id
                })
            })


            let data = await response.json()
            console.log(data)
            setWalletSuccess(true)

            setWalletName('')
            setChain('')
            setXPub('')
        } catch (error) {
            setWalletFail(true)
            setWalletName('')
            setChain('')
            setXPub('')
            console.error("Unable to sumbit new wallet: ", error.message)
        }
    }




    const OptionButtons = () => (
        <Button onClick={() => navigate(-1)}>Back</Button>
    )
    const ToastMessages = () => (
        <ToastContainer className="p-3" position="bottom-end">
            <Toast onClose={() => setWalletSuccess(false)} show={walletSuccess} delay={5000} autohide>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Success!</strong>
                </Toast.Header>
                <Toast.Body>Wallet was added successfully</Toast.Body>
            </Toast>
            <Toast onClose={() => setWalletFail(false)} show={walletFail} delay={5000} autohide>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Fail!</strong>
                </Toast.Header>
                <Toast.Body>Failed to add wallet :(</Toast.Body>
            </Toast>
            <Toast onClose={() => setAccountSuccess(false)} show={accountSuccess} delay={5000} autohide>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Account Success!</strong>
                </Toast.Header>
                <Toast.Body>Account was added successfully</Toast.Body>
            </Toast>
            <Toast onClose={() => setAccountFail(false)} show={accountFail} delay={5000} autohide>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Account Fail!</strong>
                </Toast.Header>
                <Toast.Body>Failed to add account :(</Toast.Body>
            </Toast>
        </ToastContainer>
    )

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
        <>
            <div className='mx-auto w-50 my-5'>
                <h1>Add Account</h1>
                <Form className="my-5 w-75 mx-auto">
                    <Form.Group>
                        <Form.Label>Account Name</Form.Label>
                        <Form.Control type="text" onChange={handleAccountNameChange} value={accountName} required />
                        <Button
                            variant='warning'
                            className="mt-3"
                            onClick={handleAccountSubmit}
                        >
                            Add Account
                        </Button>
                    </Form.Group>
                </Form>
            </div>


            <h1>Add new wallet to an existing account</h1>
            <Form className="my-5 w-75 mx-auto" onSubmit={handleWalletSubmit}>
                <Form.Group>
                    <Form.Label>Account</Form.Label>
                    <Form.Select onChange={handleChoiceChange} value={choice.name}>
                        {accounts.map(account => {
                            return (
                                <option key={account._id}>{account.accountName}</option>
                            )
                        })}
                    </Form.Select>
                    <Form.Label>Wallet Name</Form.Label>
                    <Form.Control type="text" placeholder='My Wallet' onChange={handleWalletNameChange} value={walletName} required />
                    <Form.Label>Wallet Type</Form.Label>
                    <Form.Control type="text" placeholder='Btc, Bch, Eth, Sol, etc.' onChange={handleChainChange} value={chain} required />
                    <Form.Label>Wallet xPub</Form.Label>
                    <Form.Control type="text" placeholder='xPub address here' onChange={handleXPubChange} value={xPub} required />
                    <Button
                        variant='success'
                        className="mt-3"
                        type="submit"
                    >
                        Add Wallet
                    </Button>
                </Form.Group>
            </Form>


            <OptionButtons />
            <ToastMessages />
        </>
    )
}

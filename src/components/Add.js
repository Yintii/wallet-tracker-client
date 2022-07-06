import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Toast, ToastContainer, Container, Row, Col } from 'react-bootstrap'
import { AddAccount } from './AddAccount'
import { AddWallet } from './AddWallet'



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
            return
        }
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

    const handleAccountSubmit = async (e) => {
        e.preventDefault()
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
            await fetch('http://localhost:5001/api/v1/accounts/add/wallet', {
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
            setWalletSuccess(true)
        } catch (error) {
            setWalletFail(true)
            console.error("Unable to submit new wallet: ", error.message)
        }
        setChain('')
        setXPub('')
        setWalletName('')
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



    return (
        <Container>
            <Row>
                <Col className="col-sm-12">
                    <AddAccount
                        accountName={accountName}
                        setAccountName={setAccountName}
                        handleAccountNameChange={handleAccountNameChange}
                        handleAccountSubmit={handleAccountSubmit}
                    />
                    <Button onClick={() => getAccounts()}>
                        Get Accounts
                    </Button>
                    <AddWallet
                        accounts={accounts}
                        walletName={walletName}
                        chain={chain}
                        xPub={xPub}
                        choice={choice}
                        handleWalletNameChange={handleWalletNameChange}
                        handleChainChange={handleChainChange}
                        handleChoiceChange={handleChoiceChange}
                        handleXPubChange={handleXPubChange}
                        handleWalletSubmit={handleWalletSubmit}
                    />
                    <OptionButtons />
                    <ToastMessages />
                </Col>
            </Row>
        </Container>
    )
}

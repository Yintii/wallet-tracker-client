import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, ListGroup, Card, Accordion } from 'react-bootstrap'

export const Check = () => {

    const [accountsList, setAccountsList] = useState([])

    function truncate(str) {
        return str.slice(0, 6) + "..." + str.slice(str.length - 4, str.length)
    }

    const FetchBtn = () => {
        async function getAccounts() {
            let data = await fetch('http://localhost:5001/api/v1/accounts/check')
                .then(response => response.json())
                .then(data => data.accountsList)
                .catch(err => console.error(err))
            setAccountsList(data)
        }

        return (
            <Button onClick={getAccounts}>
                Get Accounts
            </Button>
        )
    }

    const RenderAccounts = () => {
        console.log(accountsList)
        return (
            <>
                <h1>Accounts</h1>
                <hr />
                <FetchBtn />

                {accountsList.map(account => {
                    return (
                        <Row key={account._id} className="p-2 my-4">
                            <h1>{account.accountName}</h1>
                            {account.wallets.map(wallet => {
                                return (
                                    <Col key={wallet._id} className="wallet col-sm-4">
                                        <div className='wallet-left'>
                                            <h3>{wallet.walletName}</h3>
                                            <h4>{wallet.walletType}</h4>
                                            <div className='text-muted'>{truncate(wallet.walletXpub)}</div>
                                        </div>
                                        <div className='wallet-right'>
                                            {wallet.balance}
                                        </div>
                                    </Col>
                                )
                            })}
                        </Row>
                    )
                })}
            </>
        )
    }


    return (
        <Container>
            <Row className="my-5">
                <Col className='col-sm-12'>
                    <RenderAccounts />
                </Col>
            </Row>
        </Container>
    )
}

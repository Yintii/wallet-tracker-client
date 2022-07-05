import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, ListGroup, Card } from 'react-bootstrap'

export const Check = () => {

    const [accountsList, setAccountsList] = useState([])

    function truncate(str) {
        return str.slice(0, 5) + "..." + str.slice(str.length - 4, str.length)
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
        let render = accountsList.map(account => {
            return (
                <div key={account._id}>
                    <h2>{account.accountName}</h2>

                    {account.wallets.map(wallet => {
                        return (
                            <Card>
                                <Card.Body key={wallet._id}>
                                    <Card.Header>{wallet.walletName} - {wallet.walletType}</Card.Header>
                                    <Card.Text>xPub: {truncate(wallet.walletXpub)}</Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    })}

                </div>
            )
        })

        return (
            <Col className="col-sm-12" >
                <h1>Accounts</h1>
                <hr />
                <FetchBtn />
                {render}
            </Col >
        )
    }


    return (
        <Container>
            <Row className="mx-auto my-5">
                <RenderAccounts />
            </Row>
        </Container>
    )
}

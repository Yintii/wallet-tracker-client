import React from 'react'
import { Form, Button } from 'react-bootstrap'

export const AddWallet = ({
    handleChainChange, handleChoiceChange,
    handleWalletNameChange, handleXPubChange,
    handleWalletSubmit, accounts, choice, chain, xPub,
    walletName
}) => {
    return (
        <div>
            <h1>Add new wallet to an existing account</h1>
            <Form className="my-5 w-75 mx-auto" onSubmit={(e) => handleWalletSubmit(e)}>
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
        </div>
    )
}

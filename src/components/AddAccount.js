import React from 'react'
import { Form, Button } from 'react-bootstrap'

export const AddAccount = ({ accountName, handleAccountNameChange, handleAccountSubmit }) => {
    return (
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
    )
}

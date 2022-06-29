import React, { useState } from 'react'
import { MongoClient, ServerApiVersion } from 'mongodb'
import { Button } from 'bootstrap-react'





export const Add = () => {



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
        // const uri = `mongodb+srv://kele:Lennon231@cluster0.chl6t.mongodb.net/?retryWrites=true&w=majority`;
        // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

        // console.log('attempting to connect to database')
        // await client.connect(err => {
        //     if (err) return
        //     console.log('connected!')
        // })
    }

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

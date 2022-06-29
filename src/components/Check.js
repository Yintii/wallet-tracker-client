import React, { useState, useEffect } from 'react'
// import { data } from '../testdata/testdata'


export const Check = () => {

    const [data, setData] = useState('')


    async function getData() {
        let walletData = await fetch('http://localhost:5001/api/v1/accounts/check').then(response => response.json())
        console.log(walletData)
        setData(walletData)
    }

    const RenderData = () => {
        const renderedData = data.accountsList.map(account => {
            return (
                <h1>
                    {account.accountName}
                    {account.wallets.map(wallet => {
                        return (
                            <div style={{ backgroundColor: "green" }}>
                                <h3>{wallet.walletName}</h3>
                                <h4>{wallet.walletType}</h4>
                                <span>{wallet.walletXpub}</span>
                                <hr />
                            </div>
                        )
                    })}
                </h1>
            )
        })
        return renderedData
    }

    useEffect(() => {
        getData()
        console.log(data.accountsList[0].accountName)
    }, [])

    return (

        <RenderData />

    )
}

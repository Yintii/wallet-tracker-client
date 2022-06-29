import React, { useState, useEffect } from 'react'
// import { data } from '../testdata/testdata'


export const Check = () => {

    const [accountsList, setAccountsList] = useState([])

    async function getAccounts() {
        await fetch('http://localhost:5001/api/v1/accounts/check')
            .then(response => response.json())
            .then(data => {
                setAccountsList(data.accountsList)
            })
            .catch(err => console.error(err))
    }

    const RenderAccounts = () => {
        let render = accountsList.map(account => {
            return (
                <div class="account">
                    <h1>{account.accountName}</h1>
                    {account.wallets.map(wallet => {
                        return (
                            <div class="wallet">
                                <h4>{wallet.walletName}</h4>
                                <h4>{wallet.walletType}</h4>
                                <h4>{wallet.walletXpub}</h4>
                            </div>
                        )
                    })}
                </div>
            )
        })
        return render
    }



    useEffect(() => {
        getAccounts()
        console.log(accountsList)
    }, [])

    return (
        <>
            <h1>Accounts</h1>
            <hr />
            <RenderAccounts />
        </>
    )
}

import React, { useState, useEffect } from 'react'
import JWT from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'


export const Check = () => {

    const [accountsList, setAccountsList] = useState([])
    const navigate = useNavigate()

    async function getAccounts() {

        await fetch('http://localhost:5001/api/v1/accounts/check')
            .then(response => response.json())
            .then(data => {
                setAccountsList(data.accountsList)
            })
            .catch(err => console.error(err))

    }




    function truncate(str) {
        return str.slice(0, 5) + "..." + str.slice(str.length - 4, str.length)
    }

    const RenderAccounts = () => {
        console.log(accountsList)
        let render = accountsList.map(account => {



            return (<h1>Hello</h1>)

            // return (
            //     <div key={account._id} className="account">
            //         <h1>{account.accountName}</h1>
            //         {account.wallets.map(wallet => {
            //             return (
            //                 <div key={wallet._id} className="wallet">
            //                     <div className="wallet-left">
            //                         <h4>{wallet.walletName}</h4>
            //                         <h4>{wallet.walletType}</h4>
            //                         <h4>{truncate(wallet.walletXpub)}</h4>
            //                     </div>
            //                     <div class="wallet-right">
            //                         <h4>{wallet.balance}</h4>
            //                     </div>
            //                 </div>
            //             )
            //         })}
            //     </div>
            // )
        })
        return render
    }



    useEffect(() => {
        getAccounts()
    }, [accountsList.length])



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
            <h1>Accounts</h1>
            <hr />
            <RenderAccounts />
        </>
    )
}

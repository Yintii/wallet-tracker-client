import React from 'react'
import { data } from '../testdata/testdata'


export const Check = () => {

    const RenderData = () => {
        const renderedData = data.map(wallet => {
            return (
                <div>
                    {wallet.name}: BTC:{wallet.btc}
                </div>
            )
        })
        return renderedData
    }

    return (
        <RenderData />
    )
}

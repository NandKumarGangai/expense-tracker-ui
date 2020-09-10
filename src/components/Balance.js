import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export default function Balance() {

    const { transactions } = useContext(GlobalContext);
    const total = transactions.map(transactions => transactions.amount).reduce((acc, index) => (acc += index), 0).toFixed(2);
    return (
        <>
            <h4>Your Balance</h4>
            <h1 id="balance">${numberWithCommas(total)}</h1>
        </>
    );
}

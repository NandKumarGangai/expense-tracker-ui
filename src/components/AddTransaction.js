import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export default function AddTransaction() {
    const [Text, setText] = useState('');
    const [Amount, setAmount] = useState(0);
    const { addTransaction } = useContext(GlobalContext);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        
        const newTransaction = {
            id: Math.floor(Math.random() * 100000000),
            text: Text,
            amount: +Amount
        }

        addTransaction(newTransaction);
    }
    return (
        <>
            <h3>Add new transaction</h3>
            <form id="form">
                <div className="form-control">
                    <label htmlfor="text">Text</label>
                    <input type="text" value={Text} onChange={e => setText(e.target.value)} placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlfor="amount" >
                        Amount
                        <br />
                        (negative - expense, positive - income)</label
                    >
                    <input type="number" value={Amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount..." />
                </div>
                <button className="btn" onClick={onSubmitHandler}>Add transaction</button>
            </form>
        </>
    );
}

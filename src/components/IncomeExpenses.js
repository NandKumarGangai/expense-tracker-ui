import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export default function IncomeExpenses() {

    const { transactions = [] } = useContext(GlobalContext);
    const amounts = transactions.map( transaction => transaction.amount );
    const income = amounts
        .filter( transaction => transaction > 0)
        .reduce((transaction, item) => (transaction += item), 0)
        .toFixed(2);

    const expenses = (amounts
        .filter(transaction => transaction < 0)
        .reduce((transaction, item) => (transaction += item), 0) * -1)
        .toFixed(2);

    return (
        <>
            <div className="inc-exp-container">
                <div>
                    <h4>Income</h4>
                    <p id="money-plus" className="money plus">${numberWithCommas(income)}</p>
                </div>
                <div>
                    <h4>Expense</h4>
                    <p id="money-minus" className="money minus">${Math.abs(numberWithCommas(expenses))}</p>
                </div>
            </div>

        </>
    );
}

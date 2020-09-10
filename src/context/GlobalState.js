import React, { createContext, useReducer } from 'react';
import Axios from 'axios';
import AppReducer from './AppReducer';

const HOST = 'https://expense-tracker-server-96.herokuapp.com';

const initialState = {
    transactions: [],
    error: null,
    loading: true
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const getTransactions = async () => {
        try {
            const res = await Axios.get(`${HOST}/api/v1/transactions`);
            console.log(res.data);
            dispatch({
                type: 'GET_TRANSACTION',
                data: res.data.data
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'TRANSACTION_ERROR',
                data: error.response.data.error || { error: 'error occured...'}
            });
        }
    }

    const deleteTransaction = async (id) => {
        try {
            await Axios.delete(`${HOST}/api/v1/transactions/${id}`);

            dispatch({
                type: 'DELETE_TRANSACTION',
                data: id
            });        
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                data: error.response.data.error
            });
        }
    }

    const addTransaction = async (transaction) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const res = await Axios.post(`${HOST}/api/v1/transactions`, transaction, config);

            dispatch({
                type: 'ADD_TRANSACTION',
                data: res.data.data
            });
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                data: error.response.data.error
            });
        }
    }

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            error: state.error,
            loading: state.loading,
            getTransactions,
            deleteTransaction,
            addTransaction
        }}>
            { children }
        </GlobalContext.Provider>
    )
}

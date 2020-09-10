export default (state, { type, data }) => {
    switch (type) {
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction._id !== data)
            }

        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [ ...state.transactions, data ]
            }

        case 'GET_TRANSACTION':
            return {
                ...state,
                loading: false,
                transactions: data
            }

        case 'TRANSACTION_ERROR':
            return {
                ...state,
                error: data
            }
        default:
            return state;
    }
}
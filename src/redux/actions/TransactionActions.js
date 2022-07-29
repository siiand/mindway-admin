import {
    GET_TRANSACTION_INIT,
    GET_TRANSACTION_SUCCESS,
    GET_TRANSACTION_ERROR
} from '../constants/TransactionConstants.js';

export const getTransactionInit = () => ({
    type: GET_TRANSACTION_INIT,
});

export const getTransactionSuccess = (data) => ({
    type: GET_TRANSACTION_SUCCESS,
    data
});

export const getTransactionError = (error) => ({
    type: GET_TRANSACTION_ERROR,
    error
});
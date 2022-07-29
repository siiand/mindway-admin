import {
    GET_USER_COUNT_INIT,
    GET_USER_COUNT_SUCCESS,
    GET_USER_COUNT_ERROR
} from '../constants/DashboardConstants.js';

export const getUserCountInit = () => ({
    type: GET_USER_COUNT_INIT,
});

export const getUserCountSuccess = (data) => ({
    type: GET_USER_COUNT_SUCCESS,
    data
});

export const getUserCountError = (error) => ({
    type: GET_USER_COUNT_ERROR,
    error
});
import {
  SET_WIHTHDRAWAL_REQUEST_COMPLETE_INIT,
  SET_WIHTHDRAWAL_REQUEST_COMPLETE_SUCCESS,
  SET_WIHTHDRAWAL_REQUEST_COMPLETE_ERROR,
  GET_WITHDRAW_REQUEST_INIT,
  GET_WITHDRAW_REQUEST_SUCCESS,
  GET_WITHDRAW_REQUEST_ERROR,
} from "../constants/WithdrawRequestConstants.js";

export const getWithdrawRequestInit = () => ({
  type: GET_WITHDRAW_REQUEST_INIT,
});

export const getWithdrawRequestSuccess = (data) => ({
  type: GET_WITHDRAW_REQUEST_SUCCESS,
  data,
});

export const getWithdrawRequestError = (error) => ({
  type: GET_WITHDRAW_REQUEST_ERROR,
  error,
});

export const setWihthdrawalRequestCompleteInit = (data) => ({
  type: SET_WIHTHDRAWAL_REQUEST_COMPLETE_INIT,
  data,
});

export const setWihthdrawalRequestCompleteSuccess = (data) => ({
  type: SET_WIHTHDRAWAL_REQUEST_COMPLETE_SUCCESS,
  data,
});

export const setWihthdrawalRequestCompleteError = (error) => ({
  type: SET_WIHTHDRAWAL_REQUEST_COMPLETE_ERROR,
  error,
});

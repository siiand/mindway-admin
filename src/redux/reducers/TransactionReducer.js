import {
  GET_TRANSACTION_INIT,
  GET_TRANSACTION_SUCCESS,
  GET_TRANSACTION_ERROR,
} from "../constants/TransactionConstants.js";

const initialState = {
  data: [],
  loading: false,
  error: null,
  success: false,
  delete: false,
};

const transaction = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSACTION_INIT:
      return { ...state, loading: true };
    case GET_TRANSACTION_SUCCESS:
      return { ...state, success: true, data: action.data, loading: false };
    case GET_TRANSACTION_ERROR:
      return { ...state, error: action.error, loading: false };
    //plopImport
    default:
      return state;
  }
};

export default transaction;

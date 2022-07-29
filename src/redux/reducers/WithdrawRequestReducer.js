import {
  SET_WIHTHDRAWAL_REQUEST_COMPLETE_INIT,
  SET_WIHTHDRAWAL_REQUEST_COMPLETE_SUCCESS,
  SET_WIHTHDRAWAL_REQUEST_COMPLETE_ERROR,
  GET_WITHDRAW_REQUEST_INIT,
  GET_WITHDRAW_REQUEST_SUCCESS,
  GET_WITHDRAW_REQUEST_ERROR,
} from "../constants/WithdrawRequestConstants.js";

const initialState = {
  data: [],
  loading: false,
  error: null,
  success: false,
  delete: false,
};

const withdrawRequest = (state = initialState, action) => {
  switch (action.type) {
    case GET_WITHDRAW_REQUEST_INIT:
      return { ...state, loading: true };
    case GET_WITHDRAW_REQUEST_SUCCESS:
      return { ...state, success: true, data: action.data, loading: false };
    case GET_WITHDRAW_REQUEST_ERROR:
      return { ...state, error: action.error, loading: false };
    case SET_WIHTHDRAWAL_REQUEST_COMPLETE_INIT:
      return { ...state, loading: true };
    case SET_WIHTHDRAWAL_REQUEST_COMPLETE_SUCCESS:
      let objIndex = state.data.findIndex((obj) => obj.id === action.data.id);
      let newArray = state.data;
      newArray[objIndex].status = "complete";
      return { ...state, success: true, data: newArray, loading: false };
    case SET_WIHTHDRAWAL_REQUEST_COMPLETE_ERROR:
      return { ...state, error: action.error, loading: false };
    //plopImport
    default:
      return state;
  }
};

export default withdrawRequest;

import {
  DELETE_USER_INIT,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  USERS_FETCH_DATA_INIT,
  USERS_FETCH_DATA_FAIL,
  USERS_FETCH_DATA_SUCCESS,
} from "../constants/Users";

import { createReducer } from "redux-act";

const initialState = {
  data: [],
  loading: false,
  error: null,
  success: false,
  delete: false,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case USERS_FETCH_DATA_INIT:
      return {
        ...state,
        loading: true,
      };
    case USERS_FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case USERS_FETCH_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case DELETE_USER_INIT:
      return { ...state, loading: true };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        success: true,
        data: state.data.filter((elem) => elem.id !== action.userId),
        loading: false,
      };
    case DELETE_USER_ERROR:
      return { ...state, error: action.error, loading: false };
    //plopImport
    default:
      return state;
  }
};
export default users;

import {
  DELETE_USER_INIT,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  createAction,
} from "../constants/Users";

// import { firebase } from "..auth/FirebaseAuth.js";

// import FirebaseService from "services/FirebaseService";

// import { notification } from "antd";

import {
  USERS_FETCH_DATA_INIT,
  USERS_FETCH_DATA_SUCCESS,
  USERS_FETCH_DATA_FAIL,
} from "../constants/Users";

export const fetchUsersInit = (userId = "") => {
  return { type: USERS_FETCH_DATA_INIT, userId };
};

export const fetchUsersSuccess = (data) => {
  return { type: USERS_FETCH_DATA_SUCCESS, data };
};

export const fetchUsersFail = (error) => {
  return { type: USERS_FETCH_DATA_FAIL, error };
};

export const deleteUserInit = (userId) => ({
  type: DELETE_USER_INIT,
  userId: userId,
});

export const deleteUserSuccess = (userId) => ({
  type: DELETE_USER_SUCCESS,
  userId,
});

export const deleteUserError = (error) => ({
  type: DELETE_USER_ERROR,
  error,
});

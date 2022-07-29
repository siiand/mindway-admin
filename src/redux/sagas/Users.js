import { all, takeEvery, put, fork, call } from "redux-saga/effects";

import {
  USERS_FETCH_DATA_INIT,
  USERS_FETCH_DATA_SUCCESS,
  USERS_FETCH_DATA_FAIL,
  DELETE_USER_INIT,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  //plopImportConstant
} from "../constants/Users";

import {
  fetchUsersInit,
  fetchUsersSuccess,
  fetchUsersFail,
  deleteUserInit,
  deleteUserSuccess,
  deleteUserError,
  //plopImportAction
} from "../actions/Users";

import FirebaseService from "services/FirebaseService";

export function* getUsers() {
  yield takeEvery(USERS_FETCH_DATA_INIT, function* () {
    try {
      const users = yield call(FirebaseService.fetchCollection, "Users", {
        sort: {
          attribute: "createdAt",
          order: "desc",
        },
      });
      let changeTime = users.map((element) => {
        var d = new Date(0);
        d.setUTCMilliseconds(element.createdAt);
        return {
          ...element,
          createdAt: `${d}`,
        };
      });

      console.log(
        "🚀 ~ file: TransactionSaga.js ~ line 22 ~ changeTime ~ changeTime",
        users
      );
      yield put(fetchUsersSuccess(changeTime));
    } catch (error) {
      console.log("error : " + error);
      yield put(fetchUsersFail(error));
    }
  });
}
export function* deleteUser() {
  yield takeEvery(DELETE_USER_INIT, function* (action) {
    try {
      console.log(
        "🚀 ~ file: Doctors.js ~ line 108 ~ yieldtakeEvery ~ action",
        action
      );

      yield call(FirebaseService.deleteUser, action.userId);
      yield put(deleteUserSuccess(action.userId));
    } catch (error) {
      console.log(
        "🚀 ~ file: Doctors.js ~ line 117 ~ yieldtakeEvery ~ error",
        error
      );
      yield put(deleteUserError(error.message));
    }
  });
}
//plopSaga
export default function* rootSaga() {
  yield all([
    fork(getUsers),
    fork(deleteUser),
    //plopExport
  ]);
}

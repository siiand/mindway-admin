import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import {
  getUserCountError,
  getUserCountSuccess,
  //plopImportAction
} from "../actions/DashboardActions.js";
import {
  GET_USER_COUNT_INIT,
  //plopImportConstant
} from "redux/constants/DashboardConstants.js";

import FirebaseService from "services/FirebaseService";

export function* GetUserCount() {
  yield takeEvery(GET_USER_COUNT_INIT, function* () {
    try {
      const data = yield call(FirebaseService.countCollection, "Users");
      yield put(getUserCountSuccess(data));
    } catch (error) {
      yield put(getUserCountError(error));
    }
  });
}
//plopSaga
export default function* rootSaga() {
  yield all([
    fork(GetUserCount),
    //plopExport
  ]);
}

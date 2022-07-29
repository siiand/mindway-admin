import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import {
  getWithdrawRequestError,
  getWithdrawRequestSuccess,
  setWihthdrawalRequestCompleteSuccess,
  setWihthdrawalRequestCompleteError,
  //plopImportAction
} from "../actions/WithdrawRequestActions.js";
import {
  GET_WITHDRAW_REQUEST_INIT,
  SET_WIHTHDRAWAL_REQUEST_COMPLETE_INIT,
  //plopImportConstant
} from "redux/constants/WithdrawRequestConstants.js";

import FirebaseService from "services/FirebaseService";
import { setWithdrawalPercentageSuccess } from "redux/actions/SettingsActions.js";

export function* GetWithdrawRequest() {
  yield takeEvery(GET_WITHDRAW_REQUEST_INIT, function* () {
    try {
      const data = yield call(
        FirebaseService.fetchCollection,
        "WithdrawRequest"
      );
      console.log(
        "🚀 ~ file: WithdrawRequestSaga.js ~ line 21 ~ yieldtakeEvery ~ data",
        data
      );

      yield put(getWithdrawRequestSuccess(data));
    } catch (error) {
      console.log(
        "🚀 ~ file: WithdrawRequestSaga.js ~ line 29 ~ yieldtakeEvery ~ error",
        error.message
      );

      yield put(getWithdrawRequestError(error));
    }
  });
}
export function* setWihthdrawalRequestComplete() {
  yield takeEvery(SET_WIHTHDRAWAL_REQUEST_COMPLETE_INIT, function* (action) {
    try {
      yield call(FirebaseService.markWithdrawalRequestComplete, action.data);
      yield put(setWihthdrawalRequestCompleteSuccess(action.data));
    } catch (error) {
      yield put(setWihthdrawalRequestCompleteError(error));
    }
  });
}
//plopSaga
export default function* rootSaga() {
  yield all([
    fork(GetWithdrawRequest),
    fork(setWihthdrawalRequestComplete),
    //plopExport
  ]);
}

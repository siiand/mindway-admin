import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import {
  getTransactionError,
  getTransactionSuccess,
  //plopImportAction
} from "../actions/TransactionActions.js";
import {
  GET_TRANSACTION_INIT,
  //plopImportConstant
} from "redux/constants/TransactionConstants.js";

import FirebaseService from "services/FirebaseService";

export function* GetTransaction() {
  yield takeEvery(GET_TRANSACTION_INIT, function* () {
    try {
      const data = yield call(FirebaseService.fetchCollection, "Order", {
        sort: {
          attribute: "createdAt",
          order: "desc",
        },
      });
      let changeTime = data.map((element) => {
        var d = new Date(0);
        d.setUTCSeconds(element.createdAt.seconds);
        return {
          ...element,
          createdAt: `${d}`,
        };
      });

      console.log(
        "🚀 ~ file: TransactionSaga.js ~ line 22 ~ changeTime ~ changeTime",
        changeTime
      );

      yield put(getTransactionSuccess(changeTime));
    } catch (error) {
      console.log(
        "🚀 ~ file: TransactionSaga.js ~ line 41 ~ yieldtakeEvery ~ error",
        error.message
      );
      yield put(getTransactionError(error));
    }
  });
}
//plopSaga
export default function* rootSaga() {
  yield all([
    fork(GetTransaction),
    //plopExport
  ]);
}

import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import {
  fetchDoctorCategoryFail,
  fetchDoctorCategorySuccess,
} from "redux/actions/DoctorCategory";

import { DOCTOR_CATEGORY_FETCH_INIT } from "redux/constants/DoctorCategory";

import FirebaseService from "services/FirebaseService";

export function* getDoctorCategory() {
  yield takeEvery(DOCTOR_CATEGORY_FETCH_INIT, function* () {
    try {
      const doctorCategory = yield call(
        FirebaseService.fetchCollection,
        "DoctorCategory"
      );
      yield put(fetchDoctorCategorySuccess(doctorCategory));
    } catch (error) {
      yield put(fetchDoctorCategoryFail(error));
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getDoctorCategory)]);
}

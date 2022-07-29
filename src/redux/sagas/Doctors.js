import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import {
  fetchDoctorFail,
  fetchDoctorSuccess,
  fetchTopRatedDoctorSuccess,
  deleteTopRatedSuccess,
  deleteTopRatedError,
  addTopRatedDoctorSuccess,
  addTopRatedDoctorError,
  deleteDoctorSuccess,
  deleteDoctorError,
  setDoctorAccountStatusSuccess,
  setDoctorAccountStatusError,
  //plopImportAction
} from "../actions/Doctor";
import {
  DOCTOR_FETCH_INIT,
  FETCH_TOP_RATED_DOCTOR_INIT,
  DELETE_TOP_RATED_INIT,
  ADD_TOP_RATED_DOCTOR_INIT,
  DELETE_DOCTOR_INIT,
  SET_DOCTOR_ACCOUNT_STATUS_INIT,
  //plopImportConstant
} from "redux/constants/Doctor";

import FirebaseService from "services/FirebaseService";

export function* getDoctors() {
  yield takeEvery(DOCTOR_FETCH_INIT, function* () {
    try {
      const doctors = yield call(FirebaseService.fetchCollection, "Doctors", {
        sort: {
          attribute: "createdAt",
          order: "desc",
        },
      });
      let changeTime = doctors.map((element) => {
        var d = new Date(0);
        d.setUTCSeconds(element.createdAt.seconds);
        return {
          ...element,
          createdAt: `${d}`,
        };
      });
      yield put(fetchDoctorSuccess(changeTime));
    } catch (error) {
      console.log(
        "🚀 ~ file: Doctors.js ~ line 37 ~ yieldtakeEvery ~ error",
        error
      );
      yield put(fetchDoctorFail(error));
    }
  });
}

export function* getTopRatedDoctor() {
  yield takeEvery(FETCH_TOP_RATED_DOCTOR_INIT, function* () {
    try {
      const listIdTopRatedDoctor = yield call(
        FirebaseService.fetchCollection,
        "TopRatedDoctor"
      );

      let convertTopRatedId = listIdTopRatedDoctor.map((item) =>
        item["doctorId"].replace(/\s/g, "")
      );
      console.log(
        "🚀 ~ file: Doctors.js ~ line 41 ~ yieldtakeEvery ~ convertTopRatedId",
        convertTopRatedId
      );
      if (convertTopRatedId.length > 10) {
        convertTopRatedId.length = 10;
      }

      const listTopRated = yield call(
        FirebaseService.fetchCollection,
        "Doctors",
        {
          queries: [
            {
              attribute: "uid",
              operator: "in",
              value: convertTopRatedId,
            },
          ],
        }
      );
      console.log(
        "🚀 ~ file: Doctors.js ~ line 50 ~ yieldtakeEvery ~ listTopRated",
        listTopRated
      );
      yield put(fetchTopRatedDoctorSuccess(listTopRated));
    } catch (error) {}
  });
}
export function* deleteTopRated() {
  yield takeEvery(DELETE_TOP_RATED_INIT, function* (action) {
    try {
      yield call(FirebaseService.removeTopRatedDoctor, action.doctorId);
      yield put(deleteTopRatedSuccess(action.doctorId));
    } catch (error) {
      yield put(deleteTopRatedError(error.message));
    }
  });
}

export function* addTopRatedDoctor() {
  yield takeEvery(ADD_TOP_RATED_DOCTOR_INIT, function* (action) {
    try {
      yield call(FirebaseService.addTopRatedDoctor, action.doctorId);
      yield put(addTopRatedDoctorSuccess(action.doctorId));
    } catch (error) {
      console.log(
        "🚀 ~ file: Doctors.js ~ line 91 ~ yieldtakeEvery ~ error",
        error
      );

      yield put(addTopRatedDoctorError(error.message));
    }
  });
}
export function* deleteDoctor() {
  yield takeEvery(DELETE_DOCTOR_INIT, function* (action) {
    try {
      console.log(
        "🚀 ~ file: Doctors.js ~ line 108 ~ yieldtakeEvery ~ action",
        action
      );

      yield call(FirebaseService.deleteDoctorAccount, action.doctorId);
      yield put(deleteDoctorSuccess(action.doctorId));
    } catch (error) {
      console.log(
        "🚀 ~ file: Doctors.js ~ line 117 ~ yieldtakeEvery ~ error",
        error
      );
      yield put(addTopRatedDoctorError(error.message));
    }
  });
}
export function* setDoctorAccountStatus() {
  yield takeEvery(SET_DOCTOR_ACCOUNT_STATUS_INIT, function* (action) {
    try {
      yield call(
        FirebaseService.setDoctorAccountStatus,
        action.doctorId,
        action.status
      );
      yield put(setDoctorAccountStatusSuccess(action.doctorId, action.status));
    } catch (error) {
      yield put(setDoctorAccountStatusError(error));
    }
  });
}
//plopSaga

export default function* rootSaga() {
  yield all([
    fork(getDoctors),
    fork(getTopRatedDoctor),
    fork(deleteTopRated),
    fork(addTopRatedDoctor),
    fork(deleteDoctor),
    fork(setDoctorAccountStatus),
    //plopExport
  ]);
}

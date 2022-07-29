import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import {
  setWithdrawalPercentageError,
  setWithdrawalPercentageSuccess,
  getWithdrawalSettingsSuccess,
  getWithdrawalSettingsError,
  saveImageCarouselSuccess,
  saveImageCarouselError,
  getImageCarouselSuccess,
  getImageCarouselError,
  deleteImageCarouselSuccess,
  deleteImageCarouselError,
  //plopImportAction
} from "../actions/SettingsActions.js";
import {
  SET_WITHDRAWAL_PERCENTAGE_INIT,
  GET_WITHDRAWAL_SETTINGS_INIT,
  SAVE_IMAGE_CAROUSEL_INIT,
  GET_IMAGE_CAROUSEL_INIT,
  DELETE_IMAGE_CAROUSEL_INIT,
  //plopImportConstant
} from "redux/constants/SettingsConstants.js";

import FirebaseService from "services/FirebaseService";

export function* SetWithdrawalPercentage() {
  yield takeEvery(SET_WITHDRAWAL_PERCENTAGE_INIT, function* (action) {
    try {
      yield call(FirebaseService.setPercentage, action);
      yield put(setWithdrawalPercentageSuccess(action.data));
    } catch (error) {
      yield put(setWithdrawalPercentageError(error));
    }
  });
}
export function* getWithdrawalSettings() {
  yield takeEvery(GET_WITHDRAWAL_SETTINGS_INIT, function* () {
    try {
      const data = yield call(FirebaseService.getWithdrawalSettings);
      yield put(getWithdrawalSettingsSuccess(data));
    } catch (error) {
      yield put(getWithdrawalSettingsError(error));
    }
  });
}
export function* saveImageCarousel() {
  yield takeEvery(SAVE_IMAGE_CAROUSEL_INIT, function* (action) {
    try {
      const urlImage = yield call(
        FirebaseService.uploadImage,
        action.data.fileName,
        action.data.file
      );
      console.log("upload data " + urlImage);
      let data = { imageUrl: urlImage, fileName: action.data.fileName };
      yield call(FirebaseService.saveImageCarouselData, data);
      yield put(saveImageCarouselSuccess());
    } catch (error) {
      yield put(saveImageCarouselError(error));
    }
  });
}
export function* getImageCarousel() {
  yield takeEvery(GET_IMAGE_CAROUSEL_INIT, function* () {
    try {
      const data = yield call(FirebaseService.getImageCarousel);
      console.log(
        "🚀 ~ file: SettingsSaga.js ~ line 64 ~ yieldtakeEvery ~ data",
        data
      );

      let changeTime = data.map((element) => {
        var d = new Date(0);
        d.setUTCSeconds(element.createdAt.seconds);
        return {
          ...element,
          createdAt: `${d}`,
        };
      });

      yield put(getImageCarouselSuccess(changeTime));
    } catch (error) {
      yield put();
    }
  });
}
export function* deleteImageCarousel() {
  yield takeEvery(DELETE_IMAGE_CAROUSEL_INIT, function* (action) {
    console.log(
      "🚀 ~ file: SettingsSaga.js ~ line 89 ~ yieldtakeEvery ~ action",
      action.data
    );
    try {
      yield call(FirebaseService.removeImageCarousel, action);
      yield put(deleteImageCarouselSuccess(action.data));
    } catch (error) {
      yield put(deleteImageCarouselError(error));
    }
  });
}
//plopSaga
export default function* rootSaga() {
  yield all([
    fork(SetWithdrawalPercentage),
    fork(getWithdrawalSettings),
    fork(saveImageCarousel),
    fork(getImageCarousel),
    fork(deleteImageCarousel),
    //plopExport
  ]);
}

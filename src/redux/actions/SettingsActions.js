import {
  DELETE_IMAGE_CAROUSEL_INIT,
  DELETE_IMAGE_CAROUSEL_SUCCESS,
  DELETE_IMAGE_CAROUSEL_ERROR,
  GET_IMAGE_CAROUSEL_INIT,
  GET_IMAGE_CAROUSEL_SUCCESS,
  GET_IMAGE_CAROUSEL_ERROR,
  SAVE_IMAGE_CAROUSEL_INIT,
  SAVE_IMAGE_CAROUSEL_SUCCESS,
  SAVE_IMAGE_CAROUSEL_ERROR,
  GET_WITHDRAWAL_SETTINGS_INIT,
  GET_WITHDRAWAL_SETTINGS_SUCCESS,
  GET_WITHDRAWAL_SETTINGS_ERROR,
  SET_WITHDRAWAL_PERCENTAGE_INIT,
  SET_WITHDRAWAL_PERCENTAGE_SUCCESS,
  SET_WITHDRAWAL_PERCENTAGE_ERROR,
} from "../constants/SettingsConstants.js";

export const setWithdrawalPercentageInit = (data) => ({
  type: SET_WITHDRAWAL_PERCENTAGE_INIT,
  data,
});

export const setWithdrawalPercentageSuccess = (data) => ({
  type: SET_WITHDRAWAL_PERCENTAGE_SUCCESS,
  data,
});

export const setWithdrawalPercentageError = (error) => ({
  type: SET_WITHDRAWAL_PERCENTAGE_ERROR,
  error,
});
export const getWithdrawalSettingsInit = () => ({
  type: GET_WITHDRAWAL_SETTINGS_INIT,
});

export const getWithdrawalSettingsSuccess = (data) => ({
  type: GET_WITHDRAWAL_SETTINGS_SUCCESS,
  data,
});

export const getWithdrawalSettingsError = (error) => ({
  type: GET_WITHDRAWAL_SETTINGS_ERROR,
  error,
});

export const saveImageCarouselInit = (data) => ({
  type: SAVE_IMAGE_CAROUSEL_INIT,
  data,
});

export const saveImageCarouselSuccess = () => ({
  type: SAVE_IMAGE_CAROUSEL_SUCCESS,
});

export const saveImageCarouselError = (error) => ({
  type: SAVE_IMAGE_CAROUSEL_ERROR,
  error,
});
export const getImageCarouselInit = () => ({
  type: GET_IMAGE_CAROUSEL_INIT,
});

export const getImageCarouselSuccess = (data) => ({
  type: GET_IMAGE_CAROUSEL_SUCCESS,
  data,
});

export const getImageCarouselError = (error) => ({
  type: GET_IMAGE_CAROUSEL_ERROR,
  error,
});

export const deleteImageCarouselInit = (data) => ({
  type: DELETE_IMAGE_CAROUSEL_INIT,
  data,
});

export const deleteImageCarouselSuccess = (data) => ({
  type: DELETE_IMAGE_CAROUSEL_SUCCESS,
  data,
});

export const deleteImageCarouselError = (error) => ({
  type: DELETE_IMAGE_CAROUSEL_ERROR,
  error,
});

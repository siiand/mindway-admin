import {
  SET_DOCTOR_ACCOUNT_STATUS_INIT,
  SET_DOCTOR_ACCOUNT_STATUS_SUCCESS,
  SET_DOCTOR_ACCOUNT_STATUS_ERROR,
  DELETE_DOCTOR_INIT,
  DELETE_DOCTOR_SUCCESS,
  DELETE_DOCTOR_ERROR,
  ADD_TOP_RATED_DOCTOR_INIT,
  ADD_TOP_RATED_DOCTOR_SUCCESS,
  ADD_TOP_RATED_DOCTOR_ERROR,
  DELETE_TOP_RATED_INIT,
  DELETE_TOP_RATED_SUCCESS,
  DELETE_TOP_RATED_ERROR,
  DOCTOR_FETCH_FAIL,
  DOCTOR_FETCH_INIT,
  DOCTOR_FETCH_SUCCESS,
  FETCH_TOP_RATED_DOCTOR_INIT,
  FETCH_TOP_RATED_DOCTOR_FAIL,
  FETCH_TOP_RATED_DOCTOR_SUCCESS,
} from "../constants/Doctor";

export const fetchDoctorInit = () => ({
  type: DOCTOR_FETCH_INIT,
});

export const fetchDoctorSuccess = (data) => ({
  type: DOCTOR_FETCH_SUCCESS,
  data,
});

export const fetchDoctorFail = (err) => ({
  type: DOCTOR_FETCH_FAIL,
  err,
});

export const fetchTopRatedDoctorInit = () => ({
  type: FETCH_TOP_RATED_DOCTOR_INIT,
});

export const fetchTopRatedDoctorFail = (topRatedError) => ({
  type: FETCH_TOP_RATED_DOCTOR_FAIL,
  topRatedError,
});

export const fetchTopRatedDoctorSuccess = (topRatedDoctor) => ({
  type: FETCH_TOP_RATED_DOCTOR_SUCCESS,
  topRatedDoctor,
});

export const deleteTopRatedInit = (doctorId) => ({
  type: DELETE_TOP_RATED_INIT,
  doctorId,
});

export const deleteTopRatedSuccess = (doctorId) => ({
  type: DELETE_TOP_RATED_SUCCESS,
  doctorId,
});

export const deleteTopRatedError = (error) => ({
  type: DELETE_TOP_RATED_ERROR,
  error,
});

export const addTopRatedDoctorInit = (doctorId) => ({
  type: ADD_TOP_RATED_DOCTOR_INIT,
  doctorId,
});

export const addTopRatedDoctorSuccess = (doctorId) => ({
  type: ADD_TOP_RATED_DOCTOR_SUCCESS,
  doctorId,
});

export const addTopRatedDoctorError = (error) => ({
  type: ADD_TOP_RATED_DOCTOR_ERROR,
  error,
});

export const deleteDoctorInit = (doctorId) => ({
  type: DELETE_DOCTOR_INIT,
  doctorId: doctorId,
});

export const deleteDoctorSuccess = (doctorId) => ({
  type: DELETE_DOCTOR_SUCCESS,
  doctorId,
});

export const deleteDoctorError = (error) => ({
  type: DELETE_DOCTOR_ERROR,
  error,
});

export const setDoctorAccountStatusInit = (doctorId, status) => ({
  type: SET_DOCTOR_ACCOUNT_STATUS_INIT,
  doctorId,
  status,
});

export const setDoctorAccountStatusSuccess = (doctorId, status) => ({
  type: SET_DOCTOR_ACCOUNT_STATUS_SUCCESS,
  doctorId,
  status,
});

export const setDoctorAccountStatusError = (error) => ({
  type: SET_DOCTOR_ACCOUNT_STATUS_ERROR,
  error,
});

import {
  DOCTOR_CATEGORY_FETCH_INIT,
  DOCTOR_CATEGORY_FETCH_SUCCESS,
  DOCTOR_CATEGORY_FETCH_FAIL,
} from "redux/constants/DoctorCategory";
export const fetchDoctorCategoryInit = (userId = "") => {
  return { type: DOCTOR_CATEGORY_FETCH_INIT, userId };
};
export const fetchDoctorCategorySuccess = (data) => ({
  type: DOCTOR_CATEGORY_FETCH_SUCCESS,
  data,
});
export const fetchDoctorCategoryFail = (error) => ({
  type: DOCTOR_CATEGORY_FETCH_FAIL,
  error,
});

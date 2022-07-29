import {
  DOCTOR_CATEGORY_FETCH_FAIL,
  DOCTOR_CATEGORY_FETCH_INIT,
  DOCTOR_CATEGORY_FETCH_SUCCESS,
} from "redux/constants/DoctorCategory";

const initialState = {
  data: [],
  loading: false,
  error: null,
  success: false,
  delete: false,
};

const doctorCategory = (state = initialState, action) => {
  switch (action.type) {
    case DOCTOR_CATEGORY_FETCH_INIT:
      return { ...state, loading: true };
    case DOCTOR_CATEGORY_FETCH_SUCCESS:
      return { ...state, success: true, data: action.data, loading: false };
    case DOCTOR_CATEGORY_FETCH_FAIL:
      return { ...state, error: action.error, loading: false };

    default:
      return state;
  }
};

export default doctorCategory;

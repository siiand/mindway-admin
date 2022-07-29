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
  DOCTOR_FETCH_INIT,
  DOCTOR_FETCH_SUCCESS,
  DOCTOR_FETCH_FAIL,
  FETCH_TOP_RATED_DOCTOR_INIT,
  FETCH_TOP_RATED_DOCTOR_SUCCESS,
  FETCH_TOP_RATED_DOCTOR_FAIL,
} from "redux/constants/Doctor";

const initialState = {
  data: [],
  topRatedDoctor: [],
  loading: false,
  topRatedLoading: false,
  error: null,
  success: false,
  delete: false,
  topRatedSuccess: false,
  topRatedDelete: false,
  topRatedError: false,
};

const doctors = (state = initialState, action) => {
  switch (action.type) {
    case DOCTOR_FETCH_INIT:
      return { ...state, loading: true };
    case DOCTOR_FETCH_SUCCESS:
      return { ...state, success: true, data: action.data, loading: false };
    case DOCTOR_FETCH_FAIL:
      return { ...state, error: action.error };
    case FETCH_TOP_RATED_DOCTOR_INIT:
      return { ...state, topRatedLoading: true };
    case FETCH_TOP_RATED_DOCTOR_SUCCESS:
      return {
        ...state,
        topRatedSuccess: true,
        topRatedDoctor: action.topRatedDoctor,
        topRatedLoading: false,
      };
    case FETCH_TOP_RATED_DOCTOR_FAIL:
      return {
        ...state,
        topRatedError: action.topRatedError,
        topRatedLoading: false,
      };
    case DELETE_TOP_RATED_INIT:
      return { ...state, topRatedLoading: true };
    case DELETE_TOP_RATED_SUCCESS:
      return {
        ...state,
        success: true,
        topRatedDoctor: state.topRatedDoctor.filter(
          (elem) => elem.id !== action.doctorId
        ),
        topRatedLoading: false,
      };
    case DELETE_TOP_RATED_ERROR:
      return { ...state, topRatedError: action.error };
    case ADD_TOP_RATED_DOCTOR_INIT:
      return { ...state, loading: true };
    case ADD_TOP_RATED_DOCTOR_SUCCESS:
      let doctorAdded = state.data.find(
        (object) => object.id === action.doctorId
      );
      console.log(
        "🚀 ~ file: Doctor.js ~ line 76 ~ doctors ~ doctorAdded",
        doctorAdded
      );
      return {
        ...state,
        success: true,
        topRatedDoctor: [...state.topRatedDoctor, doctorAdded],
        loading: false,
      };
    case ADD_TOP_RATED_DOCTOR_ERROR:
      return { ...state, error: action.error };
    case DELETE_DOCTOR_INIT:
      return { ...state, loading: true };
    case DELETE_DOCTOR_SUCCESS:
      return {
        ...state,
        success: true,
        data: state.data.filter((elem) => elem.id !== action.doctorId),
        loading: false,
      };
    case DELETE_DOCTOR_ERROR:
      return { ...state, error: action.error, loading: false };
    case SET_DOCTOR_ACCOUNT_STATUS_INIT:
      return { ...state, loading: true };
    case SET_DOCTOR_ACCOUNT_STATUS_SUCCESS:
      console.log("kepanggil kok");
      console.log(
        "🚀 ~ file: Doctor.js ~ line 106 ~ doctors ~ action.docot",
        action.doctorId
      );
      let objIndex = state.data.findIndex((obj) => obj.id === action.doctorId);
      let newArray = state.data;
      newArray[objIndex].accountStatus = action.status;
      // console.log(
      //   "🚀 ~ file: Doctor.js ~ line 106 ~ doctors ~ newArray[objIndex].accountStatus",
      //   newArray[objIndex].accountStatus
      // );

      return { ...state, success: true, data: newArray, loading: false };
    case SET_DOCTOR_ACCOUNT_STATUS_ERROR:
      return { ...state, error: action.error, loading: false };
    //plopImport
    default:
      return state;
  }
};
export default doctors;

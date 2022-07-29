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

const initialState = {
  data: [],
  loading: false,
  error: null,
  successGet: false,
  delete: false,
  success: false,
  imageCarouselData: [],
  getImageCarouselLoading: false,
  getImageCarouselError: null,
  getImageCarouselSuccess: false,
  saveImageCarouselLoading: false,
  saveImageCarouselError: null,
  saveImageCarouselSuccess: false,
  deleteImageCarouselSuccess: false,
  deleteImageCarouselError: null,
};

const settings = (state = initialState, action) => {
  switch (action.type) {
    case SET_WITHDRAWAL_PERCENTAGE_INIT:
      return { ...state, loading: true };
    case SET_WITHDRAWAL_PERCENTAGE_SUCCESS:
      return { ...state, success: true, data: action.data, loading: false };
    case SET_WITHDRAWAL_PERCENTAGE_ERROR:
      return { ...state, error: action.error, loading: false };
    case GET_WITHDRAWAL_SETTINGS_INIT:
      return { ...state, loading: true };
    case GET_WITHDRAWAL_SETTINGS_SUCCESS:
      return { ...state, successGet: true, data: action.data, loading: false };
    case GET_WITHDRAWAL_SETTINGS_ERROR:
      return { ...state, error: action.error, loading: false };
    case SAVE_IMAGE_CAROUSEL_INIT:
      return { ...state, saveImageCarouselLoading: true };
    case SAVE_IMAGE_CAROUSEL_SUCCESS:
      return {
        ...state,
        saveImageCarouselSuccess: true,
        saveImageData: action.data,
        saveImageCarouselLoading: false,
      };
    case SAVE_IMAGE_CAROUSEL_ERROR:
      return {
        ...state,
        saveImageCarouselError: action.error,
        saveImageCarouselLoading: false,
      };
    case GET_IMAGE_CAROUSEL_INIT:
      return {
        ...state,
        getImageCarouselLoading: true,
        saveImageCarouselSuccess: false,
      };
    case GET_IMAGE_CAROUSEL_SUCCESS:
      return {
        ...state,
        imageCarouselData: action.data,
        getImageCarouselSuccess: true,
        getImageCarouselLoading: false,
      };
    case GET_IMAGE_CAROUSEL_ERROR:
      return {
        ...state,
        getImageCarouselError: action.error,
        getImageCarouselLoading: false,
      };
    case DELETE_IMAGE_CAROUSEL_INIT:
      return { ...state, getImageCarouselLoading: true };
    case DELETE_IMAGE_CAROUSEL_SUCCESS:
      console.log("action image id : " + JSON.stringify(action.data.imageId));
      return {
        ...state,
        deleteImageCarouselSuccess: true,
        imageCarouselData: state.imageCarouselData.filter(
          (elem) => elem.id !== action.data.imageId
        ),
        getImageCarouselLoading: false,
      };
    case DELETE_IMAGE_CAROUSEL_ERROR:
      return {
        ...state,
        deleteImageCarouselError: action.error,
        getImageCarouselLoading: false,
      };
    //plopImport
    default:
      return state;
  }
};

export default settings;

import {
    GET_USER_COUNT_INIT,
    GET_USER_COUNT_SUCCESS,
    GET_USER_COUNT_ERROR
} from "../constants/DashboardConstants.js";

const initialState = {
  data: [],
  loading: false,
  error: null,
  success: false,
  delete: false,
};

const dashboard = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_COUNT_INIT:
            return { ...state, loading: true };
        case GET_USER_COUNT_SUCCESS:
            return { ...state, success: true, data: action.data, loading: false };
        case GET_USER_COUNT_ERROR:
            return { ...state, error: action.error };
            //plopImport
        default:
            return state;
    
    }
}

export default dashboard;
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
} from '../actions/constantAction';

const initState = {
  token: null,
  user: {
    email: '',
    picture: '',
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  message: '',
};

export const reducerIndex = (state = initState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        authenticating: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
    case USER_LOGIN_FAIL:
      return {
        authenticating: false,
        error: action.payload.error,
      };

    // logout procedure
    case USER_LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...initState,
      };
    case USER_LOGOUT_FAIL:
      return {
        loading: false,
        error: action.payload.error,
        ...state,
      };

    default:
      return state;
  }
};

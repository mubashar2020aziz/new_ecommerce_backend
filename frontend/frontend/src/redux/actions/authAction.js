import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from './constantAction';
import axiosInstance from './Axios';
export const login = (user) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  const res = await axiosInstance.post(`adminsignin`, {
    ...user,
  });
  if (res.status === 200) {
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: {
        token,
        user,
      },
    });
  } else {
    if (res.status === 400) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: {
          error: res.data.error,
        },
      });
    }
  }
};

export const signup = (user) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  const res = await axiosInstance.post(`adminsignup`, {
    ...user,
  });
  if (res.status === 200) {
    const { message } = res.data;
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: {
        message,
      },
    });
  } else {
    if (res.status === 400) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: {
          error: res.data.error,
        },
      });
    }
  }
};

export const isUserLoggedIn = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (token) {
    const user = JSON.parse(localStorage.getItem('user'));
    dispatch({ type: USER_LOGIN_SUCCESS, payload: { token, user } });
  } else {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: { error: 'user login fail' },
    });
  }
};

export const signout = (user) => async (dispatch) => {
  dispatch({ type: USER_LOGOUT_REQUEST });
  const res = await axiosInstance.post(`adminsignout`, { ...user });
  if (res.status === 200) {
    localStorage.clear();
    dispatch({ type: USER_LOGOUT_SUCCESS });
  } else {
    dispatch({ type: USER_LOGOUT_FAIL, payload: { error: res.data.error } });
  }
};

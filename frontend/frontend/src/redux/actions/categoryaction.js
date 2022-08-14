import axiosInstance from './Axios';
import {
  ADD_NEW_CATEGORY_FAIL,
  ADD_NEW_CATEGORY_REQUEST,
  ADD_NEW_CATEGORY_SUCCESS,
  GET_ALL_CATEGORY_FAIL,
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_SUCCESS,
} from './constantAction';

export const getAllCategory = () => async (dispatch) => {
  dispatch({ type: GET_ALL_CATEGORY_REQUEST });
  const res = await axiosInstance.get('category/getcategories');

  if (res.status === 200) {
    const { categoriesList } = res.data;
    dispatch({
      type: GET_ALL_CATEGORY_SUCCESS,
      payload: {
        categories: categoriesList,
      },
    });
  } else {
    dispatch({
      type: GET_ALL_CATEGORY_FAIL,
      payload: { error: res.data.error },
    });
  }
};

export const addCategory = (form) => async (dispatch) => {
  dispatch({ type: ADD_NEW_CATEGORY_REQUEST });
  const res = await axiosInstance.post('category/create', form);
  console.log(res);
  if (res.status === 201) {
    dispatch({
      type: ADD_NEW_CATEGORY_SUCCESS,
      payload: { category: res.data.category },
    });
  } else {
    dispatch({ type: ADD_NEW_CATEGORY_FAIL, payload: res.data.error });
  }
};

import axiosInstance from './Axios';

export const addProduct = (form) => async (dispatch) => {
  const res = await axiosInstance.post('product/create', form);
  console.log(res);
};

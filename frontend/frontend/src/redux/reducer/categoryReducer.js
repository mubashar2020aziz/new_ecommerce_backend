import {
  ADD_NEW_CATEGORY_FAIL,
  ADD_NEW_CATEGORY_REQUEST,
  ADD_NEW_CATEGORY_SUCCESS,
  GET_ALL_CATEGORY_SUCCESS,
} from '../actions/constantAction';

const initState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNewCategories = (parentId, categories, category) => {
  let myCategories = [];
  for (let cat of categories) {
    if (cat._id === parentId) {
      myCategories.push({
        ...cat,
        children:
          cat.children && cat.children.length > 0
            ? buildNewCategories(
                parentId,
                [
                  ...cat.children,
                  {
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children,
                  },
                ],
                category
              )
            : [],
      });
    } else {
      myCategories.push({
        ...cat,
        children:
          cat.children && cat.children
            ? buildNewCategories(parentId, cat.children, category)
            : [],
      });
    }
  }
  return myCategories;
};

export const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories,
      };
    case ADD_NEW_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_NEW_CATEGORY_SUCCESS:
      const category = action.payload.category;
      const updatedCategories = buildNewCategories(
        category.parentId,
        state.categories,
        category
      );
      console.log(updatedCategories, 'updatedCategories');
      return {
        ...state,
        categories: updatedCategories,
        loading: false,
      };
    case ADD_NEW_CATEGORY_FAIL:
      return {
        ...initState,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

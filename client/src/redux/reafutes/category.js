const initialState = {
  categories: [],
  error: null,
  loading: false,
};

export const category = (state = initialState, action) => {
  switch (action.type) {
    case "category/pending":
      return {
        ...state,
        error: null,
        loading: true,
      };
    case "category/fulfilled":
      return {
        ...state,
        categories: [...action.paylaod],
        loading: false,
      };
    case "category/rejected":
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export const fetchCategory = () => {
  return async (dispatch) => {
    dispatch({ type: "category/pending" });
    try {
      const res = await fetch("http://localhost:4000/category");
      const category = await res.json();
      dispatch({ type: "category/fulfilled", paylaod: category });
    } catch (error) {
      dispatch({ type: "category/rejected", paylaod: error });
    }
  };
};

export default category;

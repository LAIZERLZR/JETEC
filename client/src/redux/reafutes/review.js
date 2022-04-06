const initialState = {
  loading: true,
  comments: [],
  error: null,
};

const review = (state = initialState, action) => {
  switch (action.type) {
    case "review/pending":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "review/fulfilled":
      return {
        ...state,
        loading: false,
        comments: [...state.comments, action.payload],
        error: null,
      };
    case "review/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case "loadReview/pending":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "loadReview/fullfilled":
      return {
        ...state,
        loading: false,
        comments: [...action.payload],
      };
    case "loadReview/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
export const createReview = (text, productId) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "review/pending" });
    try {
      const res = await fetch("http://localhost:4000/review", {
        method: "POST",
        body: JSON.stringify({ text, productId }),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${state.application.token}`,
        },
      });
      const json = await res.json();
      console.log(json);

      dispatch({ type: "review/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "review/rejected", error: e });
    }
  };
};

export const fetchReview = () => {
  return async (dispathch) => {
    dispathch({ type: "loadReview/pending" });
    try {
      const res = await fetch("http://localhost:4000/review");
      const json = await res.json();
      dispathch({ type: "loadReview/fullfilled", payload: json });
    } catch (error) {
      dispathch({ type: "loadReview/rejected", error: error });
    }
  };
};

export default review;

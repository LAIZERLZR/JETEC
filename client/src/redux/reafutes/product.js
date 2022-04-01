const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const product = (state = initialState, action) => {
  switch (action.type) {
    case "loadProduct/pending":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "loadProduct/fulfilled":
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case "loadProduct/fulfilled":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "addProduct/panding":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "addProduct/fulfilled":
      return {
        ...state,
        loading: false,
        error: null,
      };
    case "addProduct/panding":
      return {
        ...state,
        loading: false,
        error: null,
      };
    case "addProduct/rejected":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "addProduct/panding":
      return {
        ...state,
        loading: true,
        error: action.error,
      };
    case "addProduct/fulfilled":
      return {
        ...state,
        loading: false,
        error: null,
      };
    case "addProduct/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "editProduct/panding":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "editProduct/fulfilled":
      return {
        ...state,
        loading: false,
        error: null,
      };
    case "editProduct/rejected":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const fetchProduct = () => {
  return async (dispatch) => {
    dispatch({ type: "loadProduct/pending" });
    try {
      const res = await fetch("http://localhost:4000/product");
      const product = await res.json();
      dispatch({ type: "loadProduct/fulfilled", payload: product });
    } catch (error) {
      dispatch({ type: "loadProduct/rejected", payload: error });
    }
  };
};

export const addProduct = (
  name,
  price,
  description,
  image,
  left,
  rating,
  category,
  categoryId
) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "addProduct/panding" });
    try {
      const res = await fetch("http://localhost:4000/product", {
        method: "POST",
        body: JSON.stringify({
          name,
          price,
          description,
          image,
          left,
          rating,
          category,
          categoryId,
        }),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${state.application.token}`,
        },
      });

      const product = await res.json();
      dispatch({ type: "addProduct/fulfilled", payload: product });
    } catch (error) {
      dispatch({ type: "addProduct/rejected", payload: error });
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "deleteProduct/panding" });
    try {
      const res = await fetch("http://localhost:4000/product/" + id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${state.application.token}`,
          "Content-type": "application/json",
        },
      });
      const product = await res.json();
      dispatch({ type: "addProduct/rejected", payload: product });
    } catch (error) {
      dispatch({ type: "addProduct/rejected", payload: error });
    }
  };
};

export const editProduct = (keys) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "editProduct/panding" });
    const { name, price, desc, image, left, rating, category, idCateogry, id } =
      keys;
    console.log(id);
    try {
      console.log(2);
      const res = await fetch("http://localhost:4000/product/" + id, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.application.token}`,
        },
        body: JSON.stringify({
          name,
          price,
          description: desc,
          image,
          left,
          rating,
          category,
          categoryId: idCateogry,
        }),
      });
      console.log(1);
      const editProduct = await res.json();
      dispatch({ type: "editProduct/fulfilled", payload: editProduct });
    } catch (error) {
      dispatch({ type: "editProduct/rejected", payload: error });
    }
  };
};

export default product;

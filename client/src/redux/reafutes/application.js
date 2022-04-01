const initialState = {
  signup: false,
  signin: false,
  token: localStorage.getItem("token"),
  error: null,
  user: null,
  users: [],
  card: [],
  loading: false,
};

export const application = (state = initialState, action) => {
  switch (action.type) {
    case "application/signup/panding":
      return { ...state, signUp: true, error: null };
    case "application/signup/fulfilled":
      return { ...state, signUp: false, error: null };
    case "application/signup/rejected":
      return { ...state, signUp: false, error: action.error };

    case "application/signin/panding":
      return { ...state, signin: true, error: null };
    case "application/signin/fullfiled":
      return {
        ...state,
        signin: false,
        token: action.payload,
      };
    case "application/signin/rejected":
      return { ...state, signin: false, error: action.error };

    case "loaduser/panding":
      return { ...state, loading: true, error: null };
    case "loaduser/fulfilled":
      return { ...state, loading: false, user: action.payload };
    case "loaduser/rejected":
      return { ...state, loading: true, error: action.error };

    //---------------------------

    case "upCash/panding":
      return { ...state, loading: true, error: null };
    case "upCash/fufilled":
      return { ...state, loading: false, user: action.payload };
    case "upCash/rejected":
      return { ...state, loading: false, error: null };

    //-------------------------

    case "getCard/panding":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "getCard/fulfilled":
      return {
        ...state,
        loading: false,
        card: [...action.payload.products],
      };
    case "getCard/rejecred":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    //-------------------
    case "addToCard/panding":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "addToCard/fulfilled":
      const { id, name, image, price, left, amount } = action.payload;
      return {
        ...state,
        loading: false,
        card: [...state.card, { id, name, image, price, left, amount }],
      };
    case "addToCard/rejected":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //-------------
    case "deleteProductInTheCard/panding":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "deleteProductInTheCard/fulfilled":
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        card: [...state.card.filter((item) => item.id !== action.payload)],
      };
    case "deleteProductInTheCard/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "clearCard/panding":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "clearCard/fulfilled":
      return {
        ...state,
        loading: false,
        card: [],
      };
    case "clearCard/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "plusProduct/panding":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "plusProduct/fulfilled":
      return {
        ...state,
        loading: false,
        card: [
          ...state.card.map((item) => {
            if (item.id === action.payload) {
              if (item.left > 0) {
                item.left--;
                item.amount++;
              }
            }
            return item;
          }),
        ],
        error: null,
      };

    case "plusProduct/rejected":
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "minusProduct/panding":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "minusProduct/fulfilled":
      return {
        ...state,
        loading: false,
        card: [
          ...state.card.map((item) => {
            if (item.id === action.payload) {
              if (item.amount > 1) {
                item.left++;
                item.amount--;
              }
            }
            return item;
          }),
        ],
        error: null,
      };

    case "minusProduct/rejected":
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "paymentProduct/panding":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "paymentProduct/fulfilled":
      return {
        ...state,
        loading: false,
        card: [],
      };
    case "paymentProduct/rejected":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "getUsers/panding":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "getUsers/fulfilled":
      return {
        ...state,
        loading: false,
        users: [...action.payload],
      };
    case "getUsers/rejected":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "deleteUser/panding":
      return {
        ...state,
        loading: false,
        error: null,
      };
    case "deleteUser/fulfilled":
      return {
        ...state,
        loading: false,
        error: null,
      };
    case "deleteUser/rejected":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "editUSer/panding":
      return {
        ...state,
        loading: false,
        error: null,
      };
    case "editUSer/fulfilled":
      return {
        ...state,
        loading: false,
        error: null,
      };
    case "editUSer/rejected":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const registration = (name, login, password) => {
  return async (dispatch) => {
    dispatch({ type: "application/signup/panding" });
    try {
      const res = await fetch("http://localhost:4000/signup", {
        method: "POST",
        body: JSON.stringify({ name, login, password }),
        headers: {
          "content-type": "application/json",
        },
      });
      const user = await res.json();

      dispatch({ type: "application/signup/fullfiled", payload: user });
    } catch (error) {
      dispatch({ type: "application/signup/rejected", payload: error });
    }
  };
};

export const authorization = (login, password) => {
  return async (dispatch) => {
    dispatch({ type: "application/signin/panding" });
    try {
      const res = await fetch("http://localhost:4000/signin", {
        method: "POST",
        body: JSON.stringify({ login, password }),
        headers: {
          "content-type": "application/json",
        },
      });
      const user = await res.json();
      dispatch({ type: "application/signin/fullfiled", payload: user.token });

      if (user.token === undefined) {
        dispatch({ type: "application/signin/rejected", error: user });
      } else {
        localStorage.setItem("token", user.token);
      }
    } catch (error) {
      dispatch({ type: "application/signin/rejected", error });
    }
  };
};

export const getUsers = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "getUsers/panding" });
    try {
      const res = await fetch("http://localhost:4000/users", {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${state.application.token}`,
        },
      });
      const users = await res.json();
      dispatch({ type: "getUsers/fulfilled", payload: users });
    } catch (error) {
      dispatch({ type: "getUsers/rejected", payload: error });
    }
  };
};

export const getUser = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "loaduser/panding" });
    try {
      const res = await fetch("http://localhost:4000/user", {
        headers: {
          Authorization: `Bearer ${state.application.token}`,
          "content-type": "application/json",
        },
      });
      const user = await res.json();

      dispatch({ type: "loaduser/fulfilled", payload: user });
    } catch (error) {
      dispatch({ type: "loaduser/rejecred", payload: error });
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "deleteUser/panding" });
    try {
      const res = await fetch(`http://localhost:4000/user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${state.application.token}`,
          "content-type": "application/json",
        },
      });
      const deleteUser = await res.json();

      dispatch({ type: "deleteUser/fulfilled", payload: deleteUser });
    } catch (error) {
      dispatch({ type: "deleteUser/rejected", payload: error });
    }
  };
};

export const editUser = (name, login, id) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "editUSer/panding" });
    try {
      const res = await fetch("http://localhost:4000/editUser/" + id, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.application.token}`,
        },
        body: JSON.stringify({
          name,
          login,
        }),
      });

      dispatch({ type: "editUSer/fulfilled" });
    } catch (error) {
      dispatch({ type: "editUSer/rejected", payload: error });
    }
  };
};

export const upCash = (sum, login) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "upCash/panding" });
    try {
      const res = await fetch("http://localhost:4000/upcash", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.application.token}`,
        },
        body: JSON.stringify({ login, cash: sum }),
      });

      const cash = await res.json();
      dispatch({ type: "upCash/rejected", payload: cash });
    } catch (error) {
      dispatch({ type: "upCash/rejected", payload: error });
    }
  };
};

export const getCard = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "getCard/panding" });
    try {
      const res = await fetch("http://localhost:4000/card", {
        headers: {
          Authorization: `Bearer ${state.application.token}`,
          "Content-type": "application/json",
        },
      });
      const card = await res.json();
      dispatch({ type: "getCard/fulfilled", payload: card });
    } catch (error) {
      dispatch({ type: "getCard/rejected", payload: error });
    }
  };
};

export const addToCard = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "addToCard/panding" });
    try {
      const res = await fetch(
        "http://localhost:4000/addProductInTheCard/" + id,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${state.application.token}`,
            "Content-type": "application/json",
          },
        }
      );
      const addtocard = await res.json();

      dispatch({
        type: "addToCard/fulfilled",
        payload: {
          id: addtocard._id,
          name: addtocard.name,
          image: addtocard.image,
          price: addtocard.price,
          left: addtocard.left - 1,
          amount: addtocard.amount,
        },
      });
    } catch (error) {
      dispatch({ type: "addToCard/rejected", payload: error });
    }
  };
};

export const deleteProductInTheCard = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "deleteProductInTheCard/panding" });
    try {
      const res = fetch("http://localhost:4000/deleteProductInTheCard/" + id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${state.application.token}`,
          "Content-type": "application/json",
        },
      });
      dispatch({ type: "deleteProductInTheCard/fulfilled", payload: id });
    } catch (error) {
      dispatch({ type: "deleteProductInTheCard/rejected", payload: error });
    }
  };
};

export const clearCard = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "clearCard/panding" });
    try {
      const res = await fetch("http://localhost:4000/clearCard", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.application.token}`,
        },
      });

      const clearCard = await res.json();
      dispatch({ type: "clearCard/fulfilled", payload: clearCard });
    } catch (error) {
      dispatch({ type: "clearCard/rejected", payload: error });
    }
  };
};

export const PlusProduct = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "plusProduct/panding" });
    try {
      await fetch("http://localhost:4000/plusProduct/" + id, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.application.token}`,
        },
      });
      dispatch({ type: "plusProduct/fulfilled", payload: id });
    } catch (error) {
      dispatch({ type: "plusProduct/rejected", payload: error });
    }
  };
};

export const MinusProduct = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "minusProduct/panding" });
    try {
      await fetch("http://localhost:4000/minusProduct/" + id, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.application.token}`,
        },
      });
      dispatch({ type: "minusProduct/fulfilled", payload: id });
    } catch (error) {
      dispatch({ type: "minusProduct/rejected", payload: error });
    }
  };
};

export const paymentProducts = (sum, login) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "paymentProduct/panding" });
    try {
      const res = await fetch("http://localhost:4000/paymentProduct", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.application.token}`,
        },
        body: JSON.stringify({ login, cash: sum }),
      });
      const payment = await res.json();
      dispatch({ type: "paymentProduct/fulfilled", payload: payment });
    } catch (error) {
      dispatch({ type: "paymentProduct/rejected", payload: error });
    }
  };
};

export default application;

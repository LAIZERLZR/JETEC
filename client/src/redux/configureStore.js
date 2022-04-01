import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import application from "../redux/reafutes/application";
import category from "../redux/reafutes/category";
import product from "../redux/reafutes/product";

export const store = createStore(
  combineReducers({
    application,
    category,
    product,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

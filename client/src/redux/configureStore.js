import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import application from "../redux/reafutes/application";
import category from "../redux/reafutes/category";
import product from "../redux/reafutes/product";
import review from "../redux/reafutes/review";

export const store = createStore(
  combineReducers({
    application,
    category,
    product,
    review,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

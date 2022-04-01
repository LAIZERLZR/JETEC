import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import HomePage from "../components/pages/HomePage";
import SignUpPage from "../components/pages/SignUpPage";
import SignInPage from "../components/pages/SignInPage";
import "../App.css";
import UserPage from "./pages/UserPage";
import TopUpPage from "./pages/TopUpPage";
import ProductPage from "./pages/ProductPage";
import PaymentPage from "./pages/PaymentPage";
import AddProductPage from "./pages/AddProductPage";
import GetUsersPage from "./pages/GetUsersPage";
import EditProductPage from "./pages/EditProductPage";
import EditUser from "./pages/EditUser";

function App() {
  const token = useSelector((state) => state.application.token);

  if (token) {
    return (
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/signin" element={<Navigate to="/" replace />} />
          <Route path="/topup" element={<TopUpPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="addProduct" element={<AddProductPage />} />
          <Route path="getUsers" element={<GetUsersPage />} />
          <Route path="editProduct/:id" element={<EditProductPage />} />
          <Route path="editUser/:id" element={<EditUser />} />
        </Routes>
      </div>
    );
  }
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </div>
  );
}

export default App;

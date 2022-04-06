import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header/Header";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import "../App.css";
import UserPage from "./pages/UserPage";
import TopUpPage from "./pages/TopUpPage";
import ProductPage from "./pages/ProductPage";
import PaymentPage from "./pages/PaymentPage";
import AddProductPage from "./pages/AddProductPage";
import GetUsersPage from "./pages/GetUsersPage";
import EditProductPage from "./pages/EditProductPage";
import EditUser from "./pages/EditUser";
import DeliveryPage from "./pages/DeliveryPage";
import AboutUsPage from "./pages/AboutUsPage";
import Product from "./pages/Product";

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
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/aboutUs" element={<AboutUsPage />} />
          <Route path="/products/:id" element={<Product />} />
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
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/aboutUs" element={<AboutUsPage />} />
        <Route path="/products/:id" element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;

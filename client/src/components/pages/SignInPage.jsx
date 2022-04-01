import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authorization } from "../../redux/reafutes/application";
import { Link } from "react-router-dom";

const SignInPage = () => {
  const dispatch = useDispatch();

  const signin = useSelector((state) => state.application.signin);
  const token = useSelector((state) => state.application.token);
  const error = useSelector((state) => state.application.error);
  console.log(error);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(authorization(login, password));
  };

  return (
    <div className="form_container">
      <div className="form">
        <div>
          <input
            type="text"
            placeholder="type login"
            value={login}
            onChange={handleChangeLogin}
          />
          <input
            type="password"
            placeholder="type password"
            value={password}
            onChange={handleChangePassword}
          />
          <div className="signin__error">{error}</div>
        </div>

        <div>
          <button disabled={signin} onClick={handleSubmit}>
            <Link className="sign__btn" to="#">
              Авторизация
            </Link>
          </button>
          <div className="signin__href__container">
            <Link className="signin__href" to="/signup">
              Регистрация
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

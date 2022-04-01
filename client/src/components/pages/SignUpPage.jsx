import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registration } from "../../redux/reafutes/application";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState("disabled");

  const dispatch = useDispatch();

  const signup = useSelector((state) => state.application.signup);
  const error = useSelector((state) => state.application.error);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(registration(name, login, password));
  };
  return (
    <div className="form_container">
      <div className="form">
        {error}
        <div>
          <input
            type="text"
            placeholder="type name"
            value={name}
            onChange={handleChangeName}
          />
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
        </div>
        <div>
          <button disabled={signup} onClick={handleSubmit}>
            <Link className="sign__btn" to="/signin">
              Регистрация
            </Link>
          </button>
          <div className="signin__href__container">
            <Link className="signin__href" to="/signin">
              Есть аккаунт
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

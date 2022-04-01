import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { editUser } from "../../redux/reafutes/application";

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [login, setLogin] = useState("");

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const handleEditUser = () => {
    dispatch(editUser(name, login, id));
  };

  return (
    <div>
      <div className="addProduct__container">
        <div className="addProduct__forms">
          <input
            value={name}
            onChange={handleChangeName}
            type="text"
            placeholder="Имя"
          />
          <input
            value={login}
            onChange={handleChangeLogin}
            type="text"
            placeholder="Логин"
          />
        </div>
        <div className="addProduct__div">
          <button onClick={handleEditUser}>Изменить</button>
        </div>
      </div>
      );
    </div>
  );
};

export default EditUser;

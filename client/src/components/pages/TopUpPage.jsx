import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { upCash } from "../../redux/reafutes/application";

const TopUp = () => {
  const dispatch = useDispatch();
  const [cash, setCash] = useState("");

  const user = useSelector((state) => state.application.user);

  const handleChangeUpCash = (e) => {
    setCash(e.target.value);
  };

  const handleUpCash = () => {
    dispatch(upCash(cash, user?._id));
    document.location.reload();
  };

  return (
    <div className="topUp">
      <div>
        <input type="text" placeholder="Выберите способ оплаты" />
        <input
          onChange={handleChangeUpCash}
          value={cash}
          type="text"
          placeholder="Введите сумму"
        />
      </div>
      <button onClick={handleUpCash}>
        <Link className="topUp__href" to="/user">
          Пополнить
        </Link>
      </button>
    </div>
  );
};
export default TopUp;

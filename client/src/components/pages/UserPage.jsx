import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../redux/reafutes/application";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const UserPage = () => {
  const dispatch = useDispatch();
  const [exetWindow, setExetWindow] = useState(false);

  const user = useSelector((state) => state.application.user);
  console.log(user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleExet = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    document.location.reload();
  };

  const modal__exetWindow = () => {
    setExetWindow(true);
  };

  const modal__NoexetWindow = () => {
    setExetWindow(false);
  };

  return (
    <div className="userPage__container">
      <div className="userPage">
        <div className="user__image">
          <img src={user?.image} />
        </div>
        <div className="user__info">
          <div>Пользователь: {user?.name}</div>
          {user?.role === "User" ? (
            <div className="balance">
              <span>Баланс: {user?.cash + "₽"}</span>
              <button>
                <Link className="exet__href" to="/topup">
                  <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </Link>
              </button>
            </div>
          ) : (
            <></>
          )}
          <div className="exet">
            <button className="exet__btn" onClick={modal__exetWindow}>
              Выход
              {exetWindow ? (
                <div className="modal__exetWindow">
                  <h4>Вы уверены что хотите выйти?</h4>
                  <div className="exetWindow__btn">
                    <button onClick={handleExet} className="exet__yes">
                      Да
                    </button>
                    <button onClick={modal__NoexetWindow} className="exet__no">
                      Нет
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;

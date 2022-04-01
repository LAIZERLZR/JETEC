import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/reafutes/application";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { deleteUser } from "../../redux/reafutes/application";
import { Link } from "react-router-dom";

const GetUsersPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.application.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="users__container">
      {users.map((item) => {
        return (
          <>
            {item?.role === "User" ? (
              <div className="users">
                <img src={item?.image} alt="" />
                <div>Имя: {item?.name}</div>
                <div>Логин: {item?.login}</div>
                <Link to={`/editUser/${item?._id}`}>
                  <FontAwesomeIcon className="delete__user" icon={faPencil} />
                </Link>
                <FontAwesomeIcon
                  onClick={() => handleDeleteUser(item._id)}
                  className="delete__user"
                  icon={faClose}
                />
              </div>
            ) : (
              <></>
            )}
          </>
        );
      })}
    </div>
  );
};

export default GetUsersPage;

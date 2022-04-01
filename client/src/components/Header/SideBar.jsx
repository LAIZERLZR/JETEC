import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../redux/reafutes/category";
import { getUser } from "../../redux/reafutes/application";
import { Link } from "react-router-dom";

const SideBar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(getUser());
  }, [dispatch]);

  const [categoryModal, setCategoryModal] = useState(false);
  const [accessoriesModal, setAccessoriesModal] = useState(false);

  const category = useSelector((state) => state.category.categories);
  const user = useSelector((state) => state.application.user);

  return (
    <div className="catalog">
      <div
        onMouseLeave={() => setCategoryModal(false)}
        onMouseOver={() => setCategoryModal(true)}
      >
        Каталог
        {categoryModal ? (
          <div className="categoryModal">
            {category.map((item, index) => {
              if (index <= 5) {
                return (
                  <Link className="catogory__href" to={`/product/${item._id}`}>
                    <div>{item.name}</div>
                  </Link>
                );
              }
            })}
          </div>
        ) : (
          ""
        )}
      </div>
      <div>Сервера</div>
      <div
        onMouseLeave={() => setAccessoriesModal(false)}
        onMouseOver={() => setAccessoriesModal(true)}
      >
        Аксессуары
        {accessoriesModal ? (
          <div className="accessoriesModal">
            {category.map((item, index) => {
              if (index > 5) {
                return (
                  <Link className="catogory__href" to={`/product/${item._id}`}>
                    <div>{item.name}</div>
                  </Link>
                );
              }
            })}
          </div>
        ) : (
          ""
        )}
      </div>
      <div>Доставка</div>
      <div>О нас</div>
      {user?.role === "Moderator" ? (
        <div className="users__admin">
          <Link to="/getusers">Пользователь </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SideBar;

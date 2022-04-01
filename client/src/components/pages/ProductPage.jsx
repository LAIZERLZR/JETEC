import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../redux/reafutes/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClose } from "@fortawesome/free-solid-svg-icons";
import { addToCard, getUser } from "../../redux/reafutes/application";
import { deleteProduct } from "../../redux/reafutes/product";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct());
    dispatch(getUser());
  }, [dispatch]);

  const products = useSelector((state) =>
    state.product.products.filter((item) => {
      if (!id) return true;
      return item.categoryId === id;
    })
  );

  const user = useSelector((state) => state.application.user);

  const rating = (num) => {
    let array = [];
    for (let i = 1; i <= num; i++) {
      array.push(i);
    }
    return array.map(() => {
      return <FontAwesomeIcon icon={faStar} />;
    });
  };

  const handleAddProduct = (id) => {
    dispatch(addToCard(id));
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <>
      {user?.role === "Admin" ? (
        <div className="addProduct__btn">
          <Link to="/addProduct">
            <button>Добавить товар</button>
          </Link>
        </div>
      ) : (
        <></>
      )}
      <div className="product__container">
        {products.map((item) => {
          return (
            <div className="product__card" key={item._id}>
              {user?.role === "Admin" ? (
                <div>
                  <FontAwesomeIcon
                    onClick={() => handleDeleteProduct(item._id)}
                    className="deleteProduct__icon"
                    icon={faClose}
                  />
                </div>
              ) : (
                <></>
              )}
              <div>
                <img src={item.image} alt="" />
              </div>

              <div className="card__info">
                <div>{item.price + "₽"}</div>
                <div>{item.name}</div>
              </div>
              <div className="rating">{rating(item.rating)}</div>
              {user?.role === "Admin" ? (
                <div className="product__btn">
                  <Link to={`/editProduct/${item._id}`}>
                    <button>Изменить товар</button>
                  </Link>
                </div>
              ) : (
                <div className="product__btn">
                  <button onClick={() => handleAddProduct(item._id)}>
                    Добавить в коризну
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductPage;

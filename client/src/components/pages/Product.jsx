import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../redux/reafutes/product";

const Product = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const item = useSelector((state) => state.product.products);

  const product = item.find((element) => element._id === id);

  return (
    <div className="product__content__container">
      <div className="product__info">
        <div className="product__img">
          <img src={product?.image} alt="" />
        </div>
        <div className="product__content">
          <div>{product?.name}</div>
          <div>Цена: {product?.price + "₽"}</div>
          <div>Категория: {product?.category}</div>
          <div>
            <button>Добавить в корзину</button>
          </div>
        </div>
      </div>
      <div className="product__desc">
        <div>{product.description}</div>
      </div>
    </div>
  );
};

export default Product;

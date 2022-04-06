import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../redux/reafutes/product";
import { createReview, fetchReview } from "../../redux/reafutes/review";

const Product = () => {
  const [comment, setComment] = useState("");
  const { id } = useParams();

  const item = useSelector((state) =>
    state.product.products.find((element) => element._id === id)
  );

  const review = useSelector((state) => state.review.comments);
  const token = useSelector((state) => state.application.token);
  console.log(review);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct());
    dispatch(fetchReview());
  }, [dispatch]);

  const handleAddComment = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = (id) => {
    dispatch(createReview(comment, id));
    setComment("");
  };

  return (
    <div className="product__content__container">
      <div className="product__info">
        <div className="product__img">
          <img src={item?.image} alt="" />
        </div>
        <div className="product__content">
          <div>{item?.name}</div>
          <div>Цена: {item?.price + "₽"}</div>
          <div>Категория: {item?.category}</div>
          <div>
            <button>Добавить в корзину</button>
          </div>
        </div>
      </div>
      <div className="product__desc">
        <div>{item?.description}</div>
      </div>
      {token !== null ? (
        <div className="review__container">
          <div className="review_text">
            <input
              placeholder="Напишите комментарий"
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></input>
            <button
              onClick={() => handleSubmitComment(item?._id)}
              disabled={!comment ? "disabled" : ""}
            >
              Отправть
            </button>
          </div>
          {review && (
            <div>
              {review.map((item) => {
                if (item?.productId == id) {
                  return (
                    <div>
                      <div>{item?.text}</div>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="review__container">
          Авторизируйтесь, что бы написать комментарий
        </div>
      )}
    </div>
  );
};

export default Product;

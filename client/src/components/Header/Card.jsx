import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faBroom } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getCard, getUser } from "../../redux/reafutes/application";
import { deleteProductInTheCard } from "../../redux/reafutes/application";
import { clearCard } from "../../redux/reafutes/application";
import { PlusProduct } from "../../redux/reafutes/application";
import { MinusProduct } from "../../redux/reafutes/application";
import { Link } from "react-router-dom";

const Card = () => {
  const [modalCard, setModalCard] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCard());
    dispatch(getUser());
  }, [dispatch]);

  const card = useSelector((state) => state.application.card);
  const user = useSelector((state) => state.application.user);

  const handleDeleteProduct = (id) => {
    dispatch(deleteProductInTheCard(id));
  };

  const handleClearCard = () => {
    dispatch(clearCard());
  };

  const handlePlusProduct = (id) => {
    dispatch(PlusProduct(id));
  };

  const handleMinusProduct = (id) => {
    dispatch(MinusProduct(id));
  };

  const resultPrice = card.reduce((acc, element) => {
    for (let i = 0; i < element.amount; i++) {
      acc += element.price;
    }
    return acc;
  }, 0);

  return (
    <div className="user__icon">
      {user?.role === "Admin" ? (
        <></>
      ) : (
        <div className="bascet" onClick={() => setModalCard(true)}>
          <FontAwesomeIcon icon={faCartShopping} />
          <span>{card.length}</span>
        </div>
      )}
      {modalCard && (
        <div className="card__container">
          {card.length === 0 ? (
            <div className="empty__card">
              <span>Добавьте товаров в корзину</span>
              <FontAwesomeIcon
                onClick={() => setModalCard(false)}
                className="closeModal__icon"
                icon={faClose}
              />
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <td>#</td>
                  <td></td>
                  <td>Товар</td>
                  <td>Остаток</td>
                  <td>Кол-во</td>
                  <td>
                    <FontAwesomeIcon
                      onClick={() => setModalCard(false)}
                      className="closeModal__icon"
                      icon={faClose}
                    />
                  </td>
                </tr>
              </thead>
              <tbody>
                {card &&
                  card.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>
                          <img className="card__img" src={item.image} alt="" />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.left}</td>
                        <td>
                          <div className="number">
                            <div>
                              <button
                                onClick={() => handleMinusProduct(item.id)}
                              >
                                -
                              </button>
                            </div>
                            <div>
                              <span>{item.amount}</span>
                            </div>
                            <div>
                              <button
                                onClick={() => handlePlusProduct(item.id)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>
                          <FontAwesomeIcon
                            onClick={() => handleDeleteProduct(item.id)}
                            icon={faClose}
                          />
                        </td>
                      </tr>
                    );
                  })}
                <td>Итог:</td>
                <td>{resultPrice + "₽"}</td>
              </tbody>
            </table>
          )}
          {card.length === 0 ? (
            ""
          ) : (
            <div className="footer__card">
              <div onClick={handleClearCard}>
                <FontAwesomeIcon icon={faBroom} />
              </div>
              <div>
                <Link to="payment" className="payment__icon">
                  <FontAwesomeIcon icon={faCartArrowDown} />
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;

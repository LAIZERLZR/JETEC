import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser, paymentProducts } from "../../redux/reafutes/application";

const PaymentPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const card = useSelector((state) => state.application.card);
  const user = useSelector((state) => state.application.user);

  const handlePaymentProducts = (resultPrice, user) => {
    dispatch(paymentProducts(resultPrice, user));
  };

  const resultPrice = card.reduce((acc, element) => {
    for (let i = 0; i < element.amount; i++) {
      acc += element.price;
    }
    return acc;
  }, 0);

  return (
    <div className="payment__container">
      <div>
        {card.map((item) => {
          return (
            <table>
              <div className="card__products">
                <tbody>
                  <tr>
                    <td>
                      <img className="" src={item.image} alt="..." />
                    </td>
                    <td>{item.name}</td>
                    <td>Количество: {item.amount}</td>
                    <td>{item.price + "₽"}</td>
                  </tr>
                </tbody>
              </div>
            </table>
          );
        })}

        <div className="address__container">
          <div className="result__price">Итоговая цена: {resultPrice}</div>
          <span>Адрес доставки</span>
          <div>
            <input type="text" placeholder="..." />
            <input type="text" placeholder="..." />
          </div>
        </div>
        <div className="payment">
          <Link className="payment__href" to="/">
            Вернутся к покупкам
          </Link>
          <button>
            <Link
              onClick={() => handlePaymentProducts(resultPrice, user._id)}
              className="payment__btn"
              to="/payment"
            >
              Оплатить
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

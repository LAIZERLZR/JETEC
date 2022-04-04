import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../redux/reafutes/product";
import Aos from "aos";
import "aos/dist/aos.css";

const TopProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  const product = Math.floor(Math.random() * products.length);

  console.log(product);

  useEffect(() => {
    dispatch(fetchProduct());
    Aos.init({ duration: 2000 });
  }, [dispatch]);

  return (
    <div className="aos__container">
      <div data-aos="fade-up" className="aos__block">
        <div className="aos__block__info">
          <h2>{products[product]?.name}</h2>
          <span>{products[product]?.description}</span>
          <div>
            <button>Перейти</button>
          </div>
        </div>
        <div className="homePage__iframe">
          <iframe
            width="900"
            height="450"
            src={products[product]?.video}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default TopProducts;

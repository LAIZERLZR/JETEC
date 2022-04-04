import React from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { slidesDatabase } from "../slidesDatabase";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const Slider = () => {
  return (
    <Swiper className="swiper" modules={[Navigation]} navigation>
      {slidesDatabase.map((item, index) => {
        return (
          <>
            <SwiperSlide
              key={index}
              className="slider"
              style={{
                "background-image": `url(${item.image})`,
              }}
            >
              <div className="slider__info">
                <p>{item.text}</p>
                <button>Подробнее</button>
              </div>
            </SwiperSlide>
          </>
        );
      })}
    </Swiper>
  );
};

export default Slider;

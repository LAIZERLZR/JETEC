import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { editProduct } from "../../redux/reafutes/product";

const EditProductPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [name, setname] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [left, setLeft] = useState("");
  const [rating, setRating] = useState("");
  const [video, setvideo] = useState("");
  const [category, setCategory] = useState("");
  const [idCateogry, setIdCategory] = useState("");

  const handleChangeName = (e) => {
    setname(e.target.value);
  };

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleChangeDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleChangeImage = (e) => {
    setImage(e.target.value);
  };

  const handleChangeLeft = (e) => {
    setLeft(e.target.value);
  };

  const handleChangeRating = (e) => {
    setRating(e.target.value);
  };

  const handleChangeVideo = (e) => {
    setvideo(e.target.value);
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleChangeIdCategory = (e) => {
    setIdCategory(e.target.value);
  };

  const keys = {
    name,
    price,
    desc,
    image,
    left,
    rating,
    category,
    idCateogry,
    id,
  };

  const handleEditProduct = () => {
    dispatch(editProduct(keys));
  };

  return (
    <div className="addProduct__container">
      <div className="addProduct__forms">
        <input
          value={name}
          onChange={handleChangeName}
          type="text"
          placeholder="Название"
        />
        <input
          value={price}
          onChange={handleChangePrice}
          type="text"
          placeholder="Цена"
        />
        <input
          value={desc}
          onChange={handleChangeDesc}
          type="text"
          placeholder="Описание"
        />
        <input
          value={image}
          onChange={handleChangeImage}
          type="text"
          placeholder="Изображение"
        />
        <input
          value={left}
          onChange={handleChangeLeft}
          type="text"
          placeholder="Количество"
        />
        <input
          value={rating}
          onChange={handleChangeRating}
          type="text"
          placeholder="Рейтинг"
        />
        <input
          value={video}
          onChange={handleChangeVideo}
          type="text"
          placeholder="Ссылка на видео"
        />
        <input
          value={category}
          onChange={handleChangeCategory}
          type="text"
          placeholder="Категория"
        />
        <input
          value={idCateogry}
          onChange={handleChangeIdCategory}
          type="text"
          placeholder="ID категории"
        />
      </div>
      <div className="addProduct__div">
        <button onClick={handleEditProduct}>Изменить</button>
      </div>
    </div>
  );
};

export default EditProductPage;

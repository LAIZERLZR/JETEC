const User = require("../models/User.model");
const Card = require("../models/Card.model");
const Product = require("../models/Product.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.userController = {
  registration: async (req, res) => {
    try {
      const { login, password, name, image, cash, role } = req.body;

      const user = await User.findOne({ login });

      if (user) {
        return res.status(401).json("Логин занят");
      }

      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );

      const createUser = await User.create({
        login,
        password: hash,
        name,
        role,
        image,
        cash,
      });

      const createCard = await Card.create({
        userId: createUser._id,
      });
      res.json(createUser);
    } catch (error) {
      res.status(401).json(error.toString());
    }
  },

  authorization: async (req, res) => {
    try {
      const { login, password } = req.body;
      const user = await User.findOne({ login });

      if (!user) {
        res.status(401).json("Не верный логин или пароль");
      }

      const pass = await bcrypt.compare(password, user.password);

      if (!pass) {
        res.status(401).json("Не верный логин или пароль");
      }

      const payload = {
        id: user._id,
        login: user.login,
        name: user.name,
        cash: user.cash,
        image: user.image,
        role: user.role,
      };

      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "30d",
      });

      res.json({ token });
    } catch (error) {
      res
        .status(401)
        .json({ error: "Ошибка при входе в аккаунт" + error.toString() });
    }
  },
  getUser: async (req, res) => {
    try {
      const getUser = await User.findById(req.user.id);
      res.json(getUser);
    } catch (error) {
      console.log(error);
    }
  },
  getUsers: async (req, res) => {
    try {
      const getUsers = await User.find();
      res.json(getUsers);
    } catch (error) {
      res.json("Ошибка вывода пользователей");
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json("User был удален");
    } catch (error) {
      res.json(error);
    }
  },
  editUser: async (req, res) => {
    try {
      const { login, name } = req.body;
      await User.findByIdAndUpdate(req.params.id, {
        login,
        name,
      });
      res.json("user has been update");
    } catch (error) {
      res.json({ error });
    }
  },
  editUserCash: async (req, res) => {
    try {
      const { cash } = req.body;
      const { login } = req.user;
      const user = await User.findOne({ login });
      const sum = Number(user.cash) + Number(cash);
      const edituser = await User.findByIdAndUpdate(user._id, {
        cash: sum,
      });
      res.json(edituser);
    } catch (error) {
      console.log(error);
    }
  },
  getUserById: async (req, res) => {
    try {
      const getUserById = await User.findById(req.params.id);
      res.json(getUserById);
    } catch (error) {
      console.log(error);
    }
  },
  getCard: async (req, res) => {
    try {
      const card = await Card.findOne({ userId: req.user.id });
      res.json(card);
    } catch (error) {
      console.log(error);
    }
  },
  AddProductInTheCard: async (req, res) => {
    try {
      const getCard = await Card.findOne({ userId: req.user.id });
      const getProduct = await Product.findById(req.params.id);
      if (getCard) {
        await Card.findByIdAndUpdate(getCard._id, {
          $addToSet: {
            products: {
              id: getProduct._id,
              name: getProduct.name,
              image: getProduct.image,
              price: getProduct.price,
              left: getProduct.left - 1,
              amount: getProduct.amount,
            },
          },
        });
        res.json(getProduct);
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteProductInTheCard: async (req, res) => {
    try {
      const getCard = await Card.findOne({ userId: req.user.id });
      const productInTheCard = await Product.findById(req.params.id);
      if (getCard) {
        await Card.findByIdAndUpdate(getCard._id, {
          $pull: { products: { id: productInTheCard._id } },
        });
      }
      res.json("Product has been delete");
    } catch (error) {
      console.log(error);
    }
  },
  clearCard: async (req, res) => {
    try {
      const card = await Card.findOne({ userId: req.user.id });
      if (card) {
        await Card.findByIdAndUpdate(card._id, {
          products: [],
        });
        res.json("card has been clear");
      }
    } catch (error) {
      console.log(error);
    }
  },
  plusProduct: async (req, res) => {
    try {
      const card = await Card.findOne({ userId: req.user.id });
      if (card) {
        card.products.forEach((element) => {
          if (element.id === req.params.id) {
            if (element.left > 0) {
              element.left -= 1;
              element.amount += 1;
            }
          }
        });
        card.markModified("products");
        card.save();

        return res.json("Пополнилось");
      }
    } catch (error) {
      res.status(401).json(error.toString());
    }
  },
  minusProduct: async (req, res) => {
    try {
      const card = await Card.findOne({ userId: req.user.id });
      if (card) {
        card.products.forEach((element) => {
          if (element.id === req.params.id) {
            if (element.amount <= 1) {
              element.left += 1;
              element.amount -= 1;
            }
          }
        });

        card.markModified("products");
        card.save();

        return res.json("Уменьшилось");
      }
    } catch (error) {
      res.status(401).json(error.toString());
    }
  },
  paymentProducts: async (req, res) => {
    try {
      const card = await Card.findOne({ userId: req.user.id });
      if (card) {
        const { cash } = req.body;
        const { login } = req.user;
        const user = await User.findOne({ login });
        const sum = Number(user.cash) - Number(cash);
        await User.findByIdAndUpdate(user._id, {
          cash: sum,
        });

        const products = await Product.find();

        products.forEach((element) => {
          card.products.forEach((product) => {
            if (product.id.toString() === element._id.toString()) {
              element.left = element.left - product.amount;
            }
            element.markModified("element.left");
            element.save();
          });
        });

        await Card.findByIdAndUpdate(card._id, {
          products: [],
        });

        res.json("Покупка произошла успешно");
      }
    } catch (error) {
      res.json("Ошибка при покупке товаров");
    }
  },
};

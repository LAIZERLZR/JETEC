const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).json("Нет авторизации");
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
      res.status(401).json("Неверный тип токена");
    }

    req.user = await jwt.verify(token, process.env.SECRET_JWT_KEY);

    next();
  } catch (error) {
    res.status(401).json("Неверный токен");
  }
};

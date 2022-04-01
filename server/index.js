const express = require("express");
const mongoose = require("mongoose");
const Routers = require("./routes/index");
const cors = require("cors");

const app = express();

require("dotenv").config();

mongoose
  .connect(process.env.MONGOOSE_CONNECT)
  .then(() => console.log("connected"))
  .catch(() => console.log("error"));

app.use(cors());
app.use(express.json());
app.use(Routers);

app.listen(process.env.PORT, () =>
  console.log(`Успешный коннект на порт ${process.env.PORT}`)
);

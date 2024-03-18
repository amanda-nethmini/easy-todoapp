const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const { DatabaseConnection } = require("./Database/dbConfig");

const User = require("./Routes/User/UserRoute");
const Tods = require("./Routes/Todo/TodoRoute");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/user", User);
app.use("/todo", Tods);

app.get("/", (req, res) => {
  res.json("Hello");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  DatabaseConnection();
});

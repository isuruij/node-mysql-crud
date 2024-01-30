const express = require("express")
const bodyparser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
require("express-async-errors");

const db = require("./db")
const taxpayerRoutes = require("./routes/taxpayer.route");
const app = express()
app.use(express.json())
app.use(cookieParser())

//middleware
app.use(cors(
  {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
));

app.use(bodyparser.json());
app.use("/api/taxpayer", taxpayerRoutes);
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send("Something went wrong!");
});

async function start() {
  try {
    await db.query("SELECT 1");
    console.log("db connection succeeded.");
    app.listen(3000, () => console.log("server started at 3000"));
  } catch (err) {
    console.log("db connection failed.\n" + err);
  }
}
start();
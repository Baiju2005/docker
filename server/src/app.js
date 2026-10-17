const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/authRoute");

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/api", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/auth", authRoutes);

module.exports = app;

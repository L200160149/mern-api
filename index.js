const express = require("express");

const app = express();
const productRoutes = require("./src/routes/products");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Method",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// app.use("/", productRoutes);
app.use("/v1/", productRoutes);

app.listen(4000);

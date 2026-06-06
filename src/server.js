const express = require("express");
require("dotenv").config();
const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const pool = require("./config/database");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use(notFound);

app.use(errorHandler);

pool
  .query("SELECT NOW()")
  .then((result) => {
    console.log("Database connected:", result.rows[0]);
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
  });

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));

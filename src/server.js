const express = require("express");
const productRoutes = require("./routes/product.routes");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/api/products", productRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));

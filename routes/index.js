const productsRouter = require("./products");
const express = require('express');

function routerApi(app) {

  const router = express.Router();
  app.use('/api/v1', router)
  router.use("/products", productsRouter);
}


module.exports = routerApi;

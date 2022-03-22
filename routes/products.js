const express = require("express");
const ProductsServices = require("../services/products.services");
const validatorHandler = require("../middlewares/validator.handler");
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require("../schemas/product.schema");

const router = express.Router();
const service = new ProductsServices();

router.get("/", async (req, res) => {
  const products = await service.find();

  res.json({
    products,
  });
});

router.get(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json({
        product,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/categorias/:categoryId/products/:productsId", (req, res) => {
  const { categoryId, productsId } = req.params;
  res.json({
    categoryId,
    productsId,
    name: "producto uno",
    price: "25000",
  });
});

router.post(
  "/",
  validatorHandler(createProductSchema, "body"),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json({ newProduct });
  }
);

router.patch(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const rsta = await service.delete(id);
  res.json(rsta);
});

module.exports = router;

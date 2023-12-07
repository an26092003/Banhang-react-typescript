import express from "express";
import {
  createCategory,
  getAllCategory,
  getByIdCategory,
  getProductsByCategories,
  removeCategory,
  updateCategory,
} from "./../controllers/category.js";
import { checkPermission } from "../middlewares/checkPermission.js";
const router = express.Router();

router.get("/categories", getAllCategory);
router.get("/categories/:id", getByIdCategory);
router.post("/categories", createCategory);
router.post("/products/categories", getProductsByCategories);

router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", removeCategory);

export default router;

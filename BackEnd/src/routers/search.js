import express from "express";
import {
  searchByNameAndDescription,
  searchNameCategory,
  searchUserByNameAndEmail,
} from "../controllers/search.js";
const router = express.Router();
router.get("/products/search/pr", searchByNameAndDescription);
router.get("/User/search/n", searchUserByNameAndEmail);
router.get("/catgory/search/n", searchNameCategory);
export default router;

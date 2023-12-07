import express from "express";
import { avatar, getAll, getOne, remove, update } from "../controllers/user.js";
import { getAccountStatistics } from "../statistics/statisticsAuth.js";
const router = express.Router();
router.get("/User", getAll)
router.patch("/User/:id", update);
router.get("/User/:id", getOne);
router.delete("/User/:id", remove);
router.get('/statistics', getAccountStatistics)
router.put('/user/:id', avatar)
export default router;
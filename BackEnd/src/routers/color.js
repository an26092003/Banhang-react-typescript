import express from "express";
import { create, getAll, getById, remove, updata } from "../controllers/color.js";

const router = express.Router();
router.get('/color',getAll)
router.get('/color/:id',getById)
router.post('/color',create)
router.put('/color/:id',updata)
router.delete('/color/:id',remove)


export default router
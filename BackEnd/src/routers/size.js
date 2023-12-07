import express from "express";
import { create, getAll, getById, remove, updata } from "../controllers/size.js";

const router = express.Router()
router.get('/size',getAll)
router.get('/size/:id',getById)
router.post('/size',create)
router.put('/size/:id',updata)
router.delete('/size/:id',remove)

export default router
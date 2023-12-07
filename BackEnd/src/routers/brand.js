import express from "express";
import { create, getAll, getById, remove, updata } from "../controllers/brand.js";


const router = express.Router()
router.get('/brand',getAll)
router.get('/brand/:id',getById)
router.post('/brand',create)
router.put('/brand/:id',updata)
router.delete('/brand/:id',remove)
export default router
import express from "express";
import { signin, signup, me, logout,forgotPassword, changePassword } from "../controllers/auth.js";

const router = express.Router();

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/me', me)
router.post('/logout', logout)
router.post('/forgot-password', forgotPassword)
router.patch('/change-password', changePassword)

export default router
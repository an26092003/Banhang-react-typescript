import express from 'express';
import { createDiscount, getAllDiscount, getByIdDiscount, removeDiscount, updateDiscount } from '../controllers/discount.js';

const router = express.Router();

router.post('/discounts', createDiscount)
router.get('/discounts', getAllDiscount)
router.delete('/discounts/:id', removeDiscount)
router.get('/discounts/:id', getByIdDiscount)
router.put('/discounts/:id', updateDiscount)

export default router;

import {Router} from 'express'
import {stripePay} from '../controllers/pay.js';

const router = Router();

router.post('/create-payment-intent', stripePay)

export default router;
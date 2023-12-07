import express from 'express';
import { checkFavourite, favouriteCreat, getAllFavourites, getFavourites, removeFavourite } from "../controllers/favourite.js";

const router = express.Router();

router.get('/favourite', getAllFavourites)
router.post('/favourite', favouriteCreat)
router.get('/favourite/:user_id', getFavourites)
router.delete('/favourite/remove/:user_id/:product_id', removeFavourite)
router.post('/favourite/:user_id/product/:product_id', checkFavourite)


export default router;

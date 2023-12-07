import express from 'express';
import { getComments, createComment, removeComment, updateComment, getByIdComment } from '../controllers/comments.js';
import { getAccountComments } from '../statistics/statisticsComments.js';
const router = express.Router();

router.get('/comments', getComments);
router.post('/comments', createComment);
router.delete('/comments/:id',removeComment);
router.put('/comments/:id',updateComment)
router.get('/comments/:id',getByIdComment)
router.get('/statistics/comments',getAccountComments)


export default router;

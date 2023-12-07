import Comments from '../models/comments.js';
import Auth from '../models/auth.js';
import Product from '../models/products.js';

export const getComments = async (_req, res) => {
    try {
        const comments = await Comments.find().populate(['userId', 'parentCommentId']);

        if (comments.length === 0) {
            return res.status(200).json(comments);
        }

        return res.status(200).json(comments);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const createComment = async (req, res) => {
    const { userId, productId, text, parentCommentId } = req.body;

    try {
        const existingUser = await Auth.findById(userId);

        if (!existingUser) return res.status(401).json({ message: 'Phải đăng nhập mới được bình luận' });

        const existingProduct = await Product.findById(productId);

        if (!existingProduct) return res.status(400).json({ message: 'Không tìm thấy sản phẩm' });

        const newComment = await Comments.create({
            userId,
            productId,
            text,
            parentCommentId,
        });

        await Auth.findByIdAndUpdate(userId, {
            $addToSet: {
                comments: newComment._id,
            },
        });

        await Product.findByIdAndUpdate(productId, {
            $addToSet: {
                comments: newComment._id,
            },
        });

        return res.status(200).json(newComment);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const updateComment = async (req, res) => {

    const { id } = req.params;

    const { text, userId, productId } = req.body;

    try {
        const existingComment = await Comments.findOne({ _id: id });

        const existingUser = await Auth.findOne({ _id: userId });

        const existingProduct = await Product.findOne({ _id: productId });

        if (!existingUser) return res.status(401).json({ message: "Unauthorized" });

        if (!existingProduct) return res.status(400).json({ message: "Không tìm thấy sản phẩm" });

        if (!existingComment) return res.status(403).json({ message: "Không tìm thấy bình luận" });

        const newComment = await Comments.findOneAndUpdate({ _id: id }, { userId, productId, text }, { new: true })

        return res.status(201).json(newComment)

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}

export const removeComment = async (req, res) => {

    try {

        const { id } = req.params;

        const existingComment = await Comments.findOneAndRemove({ _id: id });

        if (!existingComment) {
            return res.status(400).json({ message: "Không tìm thấy bình luận này" })
        }

        await Product.findOneAndUpdate({ comments: id }, {
            $pull: {
                comments: id
            }
        });
        await Auth.findOneAndUpdate({ comments: id }, {
            $pull: {
                comments: id
            }
        })

        return res.status(200).json({ message: "Bình luận đã được xóa" })

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}


export const getByIdComment = async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await Comments.findById(id).populate('userId', 'productId');

        if (!comment) {
            return res.status(404).json({ message: 'Không tìm thấy bình luận' });
        }

        return res.status(200).json(comment);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
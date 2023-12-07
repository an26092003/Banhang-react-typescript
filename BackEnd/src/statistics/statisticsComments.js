import Comments from '../models/comments.js';

export const getAccountComments = async (req, res) => {
    try {
      const totalComments = await Comments.countDocuments();
      
      return res.status(200).json({
        totalComments,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  };
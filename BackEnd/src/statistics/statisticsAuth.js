import Auth from '../models/auth.js'

export const getAccountStatistics = async (req, res) => {
    try {
      const usage = await Auth.countDocuments();
      
      return res.status(200).json({
        usage,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  };
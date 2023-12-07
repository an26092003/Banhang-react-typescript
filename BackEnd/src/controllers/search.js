import Product from "../models/products.js";
import Auth from "../models/auth.js";
import Category from "../models/category.js";
export const searchByNameAndDescription = async (req, res) => {
  try {
    const { keyword } = req.query; // Lấy từ khóa từ query parameter trong URL
    const products = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } }, // Tìm kiếm theo tên
        { description: { $regex: keyword, $options: "i" } }, // Tìm kiếm theo mô tả
      ],
    });

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm với từ khóa này",
      });
    }

    return res.status(200).json({
      products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const searchUserByNameAndEmail = async (req, res) => {
  try {
    const { keyword } = req.query;
    const products = await Auth.find({
      $or: [{ name: { $regex: keyword, $options: "i" } }],
    });

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm với từ khóa này",
      });
    }

    return res.status(200).json({
      products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const searchNameCategory = async (req, res) => {
  try {
    const { keyword } = req.query;
    const category = await Category.find({
      $or: [{ name: { $regex: keyword, $options: "i" } }],
    });

    if (!category || category.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy danh mục với từ khóa này",
      });
    }

    return res.status(200).json({
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

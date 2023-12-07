import { categorySchema } from "../Schemas/category.js";
import Category from "../models/category.js";
import Products from "../models/products.js";

export const getAllCategory = async (req, res) => {
  const {
    _limit = 999,
    _sort = "createdAt",
    _order = "asc",
    _page = 1,
  } = req.query;

  const options = {
    limit: _limit,
    page: _page,
    sort: {
      [_sort]: _order === "desc" ? -1 : 1,
    },
  };

  try {
    const data = await Category.paginate({}, options);
    if (data.length === 0) {
      return res.status(200).json({
        message: "Không có dữ liệu",
      });
    }
    return res.json(data);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const getByIdCategory = async (req, res) => {
  try {
    const categoryId = await Category.findById(req.params.id).populate(
      "products"
    );
    if (categoryId.length === 0) {
      return res.status(200).json({
        message: "Không có dữ liệu",
      });
    }
    return res.json(categoryId);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }

    const categories = await Category.create(req.body);
    if (categories.length === 0) {
      return res.status(200).json({
        message: "Không thêm được danh mục",
      });
    }
    return res.json(categories);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const categories = await Category.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (categories.length === 0) {
      return res.status(200).json({
        message: "Cập nhật danh mục không thành công",
      });
    }
    return res.json(categories);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const removeCategory = async (req, res) => {
  try {
    const cate = await Category.findOneAndDelete({ _id: req.params.id });
    return res.json({
      message: "Xóa danh mục thành công",
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const getProductsByCategories = async (req, res) => {
  try {
    const { categoryIds, brandId } = req.body;

    // Chuyển chuỗi danh mục thành một mảng nếu có
    const categoryIdArray = categoryIds ? categoryIds.split(',') : [];

    // Query sản phẩm dựa trên danh mục và thương hiệu
    const query = {};

    if (categoryIdArray.length > 0) {
      query.categoryId = { $in: categoryIdArray };
    }

    if (brandId) {
      query.brandId = brandId;
    }

    const products = await Products.find(query);

    return res.json(products);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

import Products from "../models/products.js";
import { productSchema } from "../Schemas/products.js";
import Category from "../models/category.js";
import Brand from "../models/brand.js";
import mongoose, { ObjectId } from "mongoose";
import Order from "../models/order.js";

export const getAll = async (req, res) => {
  const {
    _limit = 155,
    _sort = "createdAt",
    _order = "desc",
    _page = 1,
  } = req.query;

  const options = {
    limit: _limit,
    page: _page,
    sort: {
      [_sort]: _order === "desc" ? -1 : 1,
    },
    populate: ['categoryId', 'colorId', 'sizeId', 'brandId']
  };
  try {
    const data = await Products.paginate({}, options);
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

export const create = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }
    const products = await Products.create(req.body);

    await Category.findByIdAndUpdate(products.categoryId, {
      $addToSet: {
        products: products._id,
      },
    });
    await Brand.findByIdAndUpdate(products.brandId, {
      $addToSet: {
        products: products._id,
      },
    });
    if (products.length === 0) {
      return res.status(200).json({
        message: "Không thêm được sản phẩm",
      });
    }
    return res.json(products);
  } catch ({ errors }) {
    return res.status(500).json({
      message: errors,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const products = await Products.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).json({
      message: "Xóa sản phẩm thành công",
    });
  } catch (errors) {
    return res.status(500).json({
      message: errors,
    });
  }
};

export const getById = async (req, res) => {
  try {
    const products = await Products.findById(req.params.id).populate(['categoryId', 'comments', 'colorId', 'brandId', 'sizeId']);
    // 'comments','colorId','brandId','sizeId',
    if (products.length === 0) {
      return res.status(200).json({
        message: "Không có dữ liệu",
      });
    }
    return res.json(products);

  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const products = await Products.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (products.length === 0) {
      return res.status(200).json({
        message: "Cập nhật sản phẩm không thành công",
      });
    }
    return res.json(products);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const getQuanlityProduct = async (req, res) => {
  const {
    _limit = 8,
    _sort = "createAt",
    _order = "asc",
    _page = 1,
    category = "", // Thêm tham số category để lọc theo danh mục sản phẩm
  } = req.query;

  const options = {
    limit: _limit,
    page: _page,
    sort: {
      [_sort]: _order === "desc" ? -1 : 1,
    },
  };

  // Tạo một mảng pipeline để định nghĩa các giai đoạn aggregation
  const pipeline = [];

  // Giai đoạn $match để lọc sản phẩm theo danh mục (nếu được cung cấp)
  if (category) {
    pipeline.push({
      $match: { category: category },
    });
  }

  // Giai đoạn $group để thống kê số sản phẩm
  pipeline.push({
    $group: {
      _id: null,
      total: { $sum: 1 },
    },
  });

  try {
    const data = await Products.aggregate(pipeline, options);
    if (data.length === 0) {
      return res.status(200).json({
        message: "Không có dữ liệu",
      });
    }
    return res.json(data[0]); // Trả về kết quả thống kê (total)
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const updateInStock = async (req, res) => {

  try {
    const { value } = req.body;

    const newValue = await Products.findByIdAndUpdate({ _id: req.params.id }, { $inc: { inStock: -value } })

    return res.status(201).json(newValue)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export const getTopProducts = async (req, res) => {

  try {
    const result = await Order.aggregate([
      { $unwind: '$products' },
      {
        $group: {
          _id: '$products._id', // Sử dụng _id của sản phẩm thay vì _id của đơn hàng
          name: { $first: '$products.name' }, // Lấy tên sản phẩm
          quantity: { $sum: '$products.quantity' }, // Tổng số lượng của từng sản phẩm
          price: { $first: '$products.price' }, // Lấy giá của sản phẩm (nếu cần)
        },
      },
      { $sort: { quantity: -1 } },
      { $limit: 10 }
    ]);


    const topProducts = await Products.populate(result, { path: '_id' });

    res.json({ success: true, data: topProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
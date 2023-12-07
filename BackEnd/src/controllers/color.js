import Color from "../models/color.js";
import joi from "joi";

const colordSchema = joi.object({
  name: joi.string().required("name là trương dữ liệu bắt buộc"),
});

export const create = async (req, res) => {
  try {
    const { error } = colordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }
    const data = await Color.create(req.body);
    if (data.length === 0) {
      return res.status(201).json({
        message: "không thêm được Màu",
      });
    }
    return res.json(data);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const getAll = async (req, res) => {
  const {
    _limit = 999,
    _sort = "createAt",
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
    const data = await Color.paginate({}, options);
    if (data.length === 0) {
      return res.status(201).json({
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

export const getById = async (req, res) => {
  try {
    const data = await Color.findById(req.params.id).populate("products");
    if (data.length === 0) {
      return res.status(201).json({
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

export const updata = async (req, res) => {
  try {
    const data = await Color.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (data.length === 0) {
      return res.status(201).json({
        message: "Cập nhập Màu không thành công",
      });
    }
    return res.json(data);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const data = await Color.findByIdAndDelete({ _id: req.params.id });
    if (data.length === 0) {
      return res.status(201).json({
        message: "Xóa thành công",
      });
    }
    return res.json({
      message: "Xóa thành công",
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

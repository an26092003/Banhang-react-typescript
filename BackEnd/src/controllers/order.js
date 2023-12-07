import { orderSchema } from "../Schemas/order.js";
import Order from "../models/order.js";
import shortid from 'shortid';
import Discount from "../models/discount.js";

export const createOrder = async (req, res) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const orderNumber = shortid.generate();

    const { status, fullName, shipping, products, userId, phone, payMethod, total, email, isPaid, discountCode } = req.body;

    let discountAmount = 0;

    // Kiểm tra xem người dùng đã nhập mã giảm giá hay không
    if (discountCode !== undefined) {
      const now = new Date();
      const appliedDiscount = await Discount.findOne({ code: discountCode });

      if (
        appliedDiscount &&
        appliedDiscount.count > 0 &&
        now >= appliedDiscount.startDate &&
        now <= appliedDiscount.endDate &&
        total >= appliedDiscount.maxAmount
      ) {
        const userUsedDiscount = appliedDiscount.usedBy.find((user) => user.userId.toString() === userId);

        if (userUsedDiscount && userUsedDiscount.used) {
          return res.status(400).json({ error: 'Bạn đã sử dụng mã giảm giá này trước đó' });
        }

        discountAmount = total * (appliedDiscount.discount / 100);
        appliedDiscount.count -= 1;

        if (userUsedDiscount) {
          userUsedDiscount.used = true;
        } else {
          appliedDiscount.usedBy.push({ userId, used: true });
        }

        await appliedDiscount.save();
      }
    }

    const newOrder = new Order({
      orderNumber,
      isPaid,
      status,
      fullName,
      shipping,
      products,
      total: total - discountAmount,
      phone,
      payMethod,
      email,
      userId,
      discountCode,
      discountAmount,
    });

    const savedOrder = await newOrder.save();
    return res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error);
    return res.status(500).json({ error: 'Không thể tạo đơn hàng' });
  }
};



// Controller để lấy danh sách đơn hàng
export const getOrders = async (req, res) => {
  const {
    _limit = 20,
    _sort = "createdAt",
    _order = "asc",
    _page = 1,
  } = req.query;

  const options = {
    limit: parseInt(_limit),
    page: parseInt(_page),
    sort: {
      [_sort]: _order === "desc" ? -1 : 1,
    },
  };
  try {
    const data = await Order.paginate({}, options);

    if (data.docs.length === 0) {
      return res.status(200).json({
        message: "Không có dữ liệu",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng:', error);
    res.status(500).json({ error: 'Lỗi khi lấy danh sách đơn hàng' });
  }
};


export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, isPaid } = req.body;

    // Tìm đơn hàng dựa trên orderId
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    // Kiểm tra xem trạng thái mới cung cấp hợp lệ hay không
    // if (!['Đang xử lý', 'Chờ xác nhận', 'Đã giao hàng', 'Đã hủy'].includes(status)) {
    //   return res.status(400).json({ message: 'Trạng thái mới không hợp lệ' });
    // }

    // Cập nhật trạng thái của đơn hàng thành trạng thái mới
    const newSatus = await Order.updateOne({ _id: orderId }, { status, isPaid }, { new: true })

    // Lưu thay đổi vào cơ sở dữ liệu

    return res.status(200).json({ message: 'Cập nhật trạng thái thành công', order: newSatus });
  } catch (error) {
    console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
    return res.status(500).json({ error: error.message });
  }
};
export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    return res.json(order);
  } catch (error) {
    console.error('Lỗi khi lấy đơn hàng theo ID:', error);
    return res.status(500).json({ error: 'Lỗi khi lấy đơn hàng' });
  }
};
export const returnOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, isPaid, LydoHoandon, Motahoandon, Emaill, products } = req.body;


    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        $set: {
          status,
          isPaid,
          LydoHoandon,
          Motahoandon,
          Emaill,
          products
        },
      },
      { new: true }
    );

    return res.status(200).json({
      message: 'Cập nhật trạng thái hoàn hàng và thông tin thành công',
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật trạng thái hoàn hàng và thông tin:', error);
    return res.status(500).json({ error: error.message });
  }
};
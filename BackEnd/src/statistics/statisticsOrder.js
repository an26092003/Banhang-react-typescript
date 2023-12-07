import Order from "../models/order.js";



export const getRevenue = async (req, res) => {
  try {
    const orders = await Order.find({ status: 4 }); 

    const totalRevenue = orders.reduce((total, order) => total + order.total, 0);

    return res.status(200).json({ totalRevenue });
  } catch (error) {
    console.error('Lỗi khi thống kê doanh thu:', error);
    return res.status(500).json({ error: 'Lỗi khi thống kê doanh thu' });
  }
};

export const getOrderStatistics = async (req, res) => {
  try {
    // Lấy số lượng đơn hàng
    const totalOrders = await Order.countDocuments();

    // Lấy số lượng đơn hàng theo trạng thái
    const statusCounts = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Tính tổng số lượng đơn hàng theo trạng thái
    const orderStatistics = statusCounts.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    return res.status(200).json({
      totalOrders,
      orderStatistics,
    });
  } catch (error) {
    console.error('Lỗi khi lấy thống kê đơn hàng:', error);
    return res.status(500).json({ error: 'Lỗi khi lấy thống kê đơn hàng' });
  }
};



export const getRevenueByDay = async (req, res) => {
  try {
    const orders = await Order.find({ status: 4 }); 

    const revenueByDay = {};
    orders.forEach((order) => {
      const createdAt = order.createdAt.toDateString();
      if (!revenueByDay[createdAt]) {
        revenueByDay[createdAt] = order.total;
      } else {
        revenueByDay[createdAt] += order.total;
      }
    });

    res.status(200).json(revenueByDay);
  } catch (error) {
    console.error('Lỗi khi thống kê doanh thu theo ngày:', error);
    res.status(500).json({ error: 'Lỗi khi thống kê doanh thu theo ngày' });
  }
};

export const calculateRevenueByMonth = async (req, res) => {
  try {
   
    const revenueByMonth = await Order.aggregate([
      { $match: { status: 4 } }, 
      {
        $group: {
          _id: { $month: '$createdAt' },
          totalRevenue: { $sum: '$total' }
        }
      },
      {
        $sort: {
          _id: 1
        }
      }
    ]);
    const formattedData = revenueByMonth.map(item => {
      const month = new Date().toLocaleString('en-US', { month: 'long' });
      const year = new Date().getFullYear();
      const monthYear = `${month} ${year}`;

      return {
        monthYear,
        totalRevenue: item.totalRevenue
      };
    });

    return res.status(200).json(formattedData);

  } catch (error) {
    console.error('Error calculating revenue by month:', error);
    return res.status(500).json({ error: 'Error calculating revenue by month' });
  }
};



export const calculateRevenueByYear = async (req, res) => {
  try {
    const revenueByYear = await Order.aggregate([
      { $match: { status: 4 } },
      {
        $group: {
          _id: { $year: '$createdAt' },
          totalRevenue: { $sum: '$total' }
        }
      },
      {
        $sort: {
          _id: 1
        }
      }
    ]);

    const formattedData = revenueByYear.map(item => {
      const year = item._id;
      const totalRevenue = item.totalRevenue;

      return {
        year,
        totalRevenue
      };
    });

    return res.status(200).json(formattedData);
  } catch (error) {
    console.error('Error calculating revenue by year:', error);
    return res.status(500).json({ error: 'Error calculating revenue by year' });
  }
};
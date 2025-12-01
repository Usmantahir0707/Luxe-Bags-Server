import Order from "../models/Order.js";

// ---------------------------------------------------------
// PUBLIC: Create Order
// ---------------------------------------------------------
export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      products,
      totalPrice,
    } = req.body;

    if (!customerName || !customerEmail || !customerPhone) {
      return res.status(400).json({ message: "Customer info is required" });
    }

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Products list is required" });
    }

    // Convert productId → product
    const formattedProducts = products.map((p) => ({
      product: p.productId, // IMPORTANT FIX
      quantity: p.quantity,
      color: p.color || null,
      size: p.size || null,
    }));

    const order = await Order.create({
      user: req.user ? req.user._id : null,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      products: formattedProducts,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------------------------------------------
// PUBLIC: Cancel Order (Customer)
// ---------------------------------------------------------
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "cancelled";
    order.cancelledAt = new Date();
    await order.save();

    res.json({ message: "Order cancelled", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------------------------------------------
// PUBLIC: Get Order by ID
// ---------------------------------------------------------
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------------------------------------------
// ADMIN: Get All Orders
// ---------------------------------------------------------
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------------------------------------------
// ADMIN: Cancel an order
// ---------------------------------------------------------
export const cancelOrderByAdmin = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "cancelled";
    order.cancelledAt = new Date();
    await order.save();

    res.json({ message: "Order cancelled by admin", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------------------------------------------
// ADMIN: Update Order Status
// ---------------------------------------------------------
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

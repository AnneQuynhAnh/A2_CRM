const express = require("express");
const router = express.Router();
const connection = require("../database"); // Ensure this path is correct

// Endpoint to create a new order
router.post("/create", (req, res) => {
  const orderData = req.body;

  // Ensure productDetails is correctly processed as JSON
  let productDetailsJSON;
  try {
    productDetailsJSON = JSON.stringify(orderData.productDetails);
  } catch (error) {
    console.error("Error stringifying product details:", error.message);
    return res.status(500).json({ error: "Error processing product details" });
  }

  const sql = `INSERT INTO customer_order 
               (staff_name, designer, customer_name, phone_no, payment_method, delivery_method, discount, amount_to_pay, note, product_details, deposited, payment_timing, delivery_company, delivery_fee) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    orderData.staffName || "",
    orderData.designer || "",
    orderData.customerName || "",
    orderData.phoneNo || "",
    orderData.paymentMethod || "",
    orderData.deliveryMethod || "",
    orderData.discount || 0,
    orderData.amountToPay || 0,
    orderData.note || "",
    productDetailsJSON,
    orderData.deposit || 0,
    orderData.payment_timing || null,
    orderData.delivery_company || "",
    orderData.delivery_fee || 0,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting order:", err.message);
      return res.status(500).json({ error: "Error inserting order" });
    }
    res.json({
      message: "Order created successfully",
      order_id: result.insertId,
    });
  });
});

// Endpoint to fetch orders
router.get("/", (req, res) => {
  const filter = req.query.filter || "order_id";
  const query = req.query.query || "";

  const sql = `SELECT * FROM customer_order WHERE ${filter} LIKE ?`;
  connection.query(sql, [`%${query}%`], (err, results) => {
    if (err) {
      console.error("Error fetching orders:", err.message);
      return res.status(500).json({ error: "Error fetching orders" });
    }
    res.json(results);
  });
});

// Update order
router.put("/update/:id", (req, res) => {
  const orderData = req.body;
  const orderId = req.params.id;

  const sql = `
    UPDATE customer_order
    SET 
      staff_name = ?, 
      designer = ?, 
      customer_name = ?, 
      phone_no = ?, 
      payment_method = ?, 
      delivery_method = ?, 
      discount = ?, 
      amount_to_pay = ?, 
      note = ?, 
      product_details = ?, 
      deposited = ?, 
      payment_timing = ?, 
      delivery_company = ?, 
      delivery_fee = ?
    WHERE order_id = ?`;

  const values = [
    orderData.staff_name,
    orderData.designer,
    orderData.customer_name,
    orderData.phone_no,
    orderData.payment_method,
    orderData.delivery_method,
    orderData.discount,
    orderData.amount_to_pay,
    orderData.note,
    orderData.product_details,
    orderData.deposited,
    orderData.payment_timing,
    orderData.delivery_company,
    orderData.delivery_fee,
    orderId,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating order:", err.message);
      return res
        .status(500)
        .json({ success: false, message: "Failed to update order." });
    }
    res.json({ success: true, message: "Order updated successfully!" });
  });
});

// Endpoint to update payment details
router.put("/order_payments/update/:order_id", (req, res) => {
  const { order_id } = req.params;
  const { payment_method, payment_timing, deposited } = req.body;

  // First, check if the payment entry exists for the order_id
  const checkQuery = `SELECT * FROM order_payments WHERE order_id = ?`;
  connection.query(checkQuery, [order_id], (err, results) => {
    if (err) {
      console.error("Error checking payment entry:", err);
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }

    if (results.length > 0) {
      // Payment entry exists, so update it
      const updateQuery = `
        UPDATE order_payments 
        SET payment_method = ?, payment_timing = ?, deposited = ?
        WHERE order_id = ?
      `;
      connection.query(
        updateQuery,
        [payment_method, payment_timing, deposited, order_id],
        (updateError) => {
          if (updateError) {
            console.error("Error updating payment details:", updateError);
            return res
              .status(500)
              .json({ success: false, message: "Database error" });
          }
          res.json({
            success: true,
            message: "Payment details updated successfully",
          });
        }
      );
    } else {
      // Payment entry doesn't exist, so insert it
      const insertQuery = `
        INSERT INTO order_payments (order_id, payment_method, payment_timing, deposited)
        VALUES (?, ?, ?, ?)
      `;
      connection.query(
        insertQuery,
        [order_id, payment_method, payment_timing, deposited],
        (insertError) => {
          if (insertError) {
            console.error("Error inserting payment details:", insertError);
            return res
              .status(500)
              .json({ success: false, message: "Database error" });
          }
          res.json({
            success: true,
            message: "Payment details added successfully",
          });
        }
      );
    }
  });
});

module.exports = router;

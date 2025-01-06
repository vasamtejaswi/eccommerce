const express = require('express');
const paypal = require('@paypal/checkout-server-sdk');
const router = express.Router();

// PayPal environment setup
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

// Create Order Endpoint
router.post('/pay', async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: req.body.amount || '20.00',
      },
    }],
  });

  try {
    const order = await client.execute(request);
    res.status(200).json(order.result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Capture Order Endpoint
router.post('/capture', async (req, res) => {
  const request = new paypal.orders.OrdersCaptureRequest(req.body.orderId);
  try {
    const capture = await client.execute(request);
    res.status(200).json(capture.result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

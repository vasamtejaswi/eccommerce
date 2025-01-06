const express = require('express');
const dotenv = require('dotenv');
const paypal = require('@paypal/paypal-server-sdk');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// PayPal environment setup
const environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_SECRET);
const client = new paypal.core.PayPalHttpClient(environment);

// Middleware for parsing JSON
app.use(express.json());

// Route to create an order
app.post('/pay', async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: req.body.amount, // Amount sent from the client
        },
      },
    ],
  });

  try {
    const order = await client.execute(request);

    // Find the approval URL in the response
    const approvalUrl = order.result.links.find((link) => link.rel === 'approve').href;

    // Send the approval URL back to the client
    res.json({ approvalUrl });
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to capture payment
app.post('/capture', async (req, res) => {
  const { orderId } = req.body;

  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    res.json({ status: 'success', capture });
  } catch (error) {
    console.error('Error capturing PayPal order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

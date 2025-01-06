import React from 'react';

const PayPalButton = () => {
  const handlePayment = () => {
    window.paypal.Buttons({
      createOrder: function(data, actions) {
        return fetch('/api/paypal/pay', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: '20.00' })
        })
        .then(res => res.json())
        .then(orderData => {
          return orderData.id;  // Return the PayPal order ID
        });
      },
      onApprove: function(data, actions) {
        return fetch('/api/paypal/capture', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId: data.orderID })
        })
        .then(res => res.json())
        .then(captureData => {
          alert('Payment Successful');
          console.log(captureData);
        });
      }
    }).render('#paypal-button-container');
  };

  return (
    <div>
      <h1>Pay with PayPal</h1>
      <div id="paypal-button-container"></div>
    </div>
  );
};

export default PayPalButton;

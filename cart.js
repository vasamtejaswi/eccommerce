// src/pages/Cart.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart } from '../redux/actions/cartActions';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const handleRemove = (productId) => {
    dispatch(removeItemFromCart(productId));
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <div>
        {cartItems.map(item => (
          <div key={item.product}>
            <h2>{item.name}</h2>
            <p>Price: {item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => handleRemove(item.product)}>Remove</button>
          </div>
        ))}
      </div>
      <button>Proceed to Checkout</button>
    </div>
  );
};

export default Cart;

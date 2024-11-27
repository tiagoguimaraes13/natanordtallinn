import React from 'react';

function Cart({ cart }) {
  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, idx) => (
            <li key={idx}>{item.name} - €{item.price}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;

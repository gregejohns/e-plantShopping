import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity, addItem } from './CartSlice'; // Import actions from CartSlice

const CartItem = ({ onContinueShopping, updateCartIconQuantity }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items); // Access cart items from the Redux state

  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      // Assuming item.cost is a string like "$12" - remove "$" and convert to a number
      const itemCost = parseFloat(item.cost.replace('$', ''));
      return total + itemCost * item.quantity;
    }, 0);
  };

  const calculateTotalCost = (item) => {
    return parseFloat(item.cost.replace('$', '')) * item.quantity;
  };

  const handleRemoveItem = (name) => {
    dispatch(removeItem(name)); // Dispatch removeItem action with the item name
  };

  const handleIncrement = (name, currentQuantity) => {
    dispatch(updateQuantity({ name, quantity: currentQuantity + 1 })); // Increment the quantity by 1
  };

  const handleDecrement = (name, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ name, quantity: currentQuantity - 1 })); // Decrement the quantity by 1
    } else {
      dispatch(removeItem(name)); // Remove item if quantity becomes 0
    }
  };

  const handleContinueShoppingClick = (e) => {
    e.preventDefault();
    onContinueShopping(); // Call the function passed from the parent component
  };

  useEffect(() => {
    // Update cart icon or any other UI elements that depend on the cart state
    const totalQuantity = calculateTotalQuantity();
    updateCartIconQuantity(totalQuantity); // Update the cart icon quantity in the navbar
  }, [cart, updateCartIconQuantity]); // Changed cartItems to cart

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item.name, item.quantity)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item.name, item.quantity)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemoveItem(item.name)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShoppingClick}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
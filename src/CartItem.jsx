import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice'; // Import actions from CartSlice

const CartItem = ({ onContinueShopping, updateCartIconQuantity }) => {
  const dispatch = useDispatch();

  // Access cart items from the Redux state
  const cart = useSelector((state) => state.cart.items);

  // Calculate the total number of items in the cart
  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  
  // Calculate the total amount for all items in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const itemCost = parseFloat(item.cost.replace('$', '')); // Remove "$" and convert to number
      return total + itemCost * item.quantity;
    }, 0);
  };

  // Calculate the total cost for a specific item
  const calculateTotalCost = (item) => {
    return parseFloat(item.cost.replace('$', '')) * item.quantity;
  };

  // Handle removing an item from the cart
  const handleRemoveItem = (name) => {
    dispatch(removeItem(name)); // Dispatch removeItem action with the item name
  };

  // Handle incrementing the item quantity
  const handleIncrement = (name, currentQuantity) => {
    dispatch(updateQuantity({ name, quantity: currentQuantity + 1 })); // Increment the quantity by 1
  };

  // Handle decrementing the item quantity
  const handleDecrement = (name, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ name, quantity: currentQuantity - 1 })); // Decrement the quantity by 1
    } else {
      dispatch(removeItem(name)); // Remove item if quantity becomes 0
    }
  };
  // Handle continue shopping button click
  const handleContinueShopping = () => {
    console.log('Continue shopping button clicked'); // Debugging log
    if (onContinueShopping) {
      onContinueShopping(); // Call the function passed from the parent component
    }
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  // useEffect to update the cart icon quantity
  useEffect(() => {
    // Update cart icon or any other UI elements that depend on the cart state
    const totalQuantity = calculateTotalQuantity();
    if (updateCartIconQuantity) {
      updateCartIconQuantity(totalQuantity); // Update the cart icon quantity in the navbar
    }
  }, [cart, updateCartIconQuantity]); // Trigger whenever the cart changes

  return (
    <div className="cart-container">
      {cart.length > 0 ? (
        <>
          <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
          <div>
            {cart.map((item) => (
              <div className="cart-item" key={item.name}>
                <img className="cart-item-image" src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-cost">{item.cost}</div>
                  <div className="cart-item-quantity">
                    <button
                      className="cart-item-button cart-item-button-dec"
                      onClick={() => handleDecrement(item.name, item.quantity)}
                    >
                      -
                    </button>
                    <span className="cart-item-quantity-value">{item.quantity}</span>
                    <button
                      className="cart-item-button cart-item-button-inc"
                      onClick={() => handleIncrement(item.name, item.quantity)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                  <button className="cart-item-delete" onClick={() => handleRemoveItem(item.name)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p style={{ color: 'black' }}>Your cart is currently empty. Add some plants to see them here!</p>
      )}
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;

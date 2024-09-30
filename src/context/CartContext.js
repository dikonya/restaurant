import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        return { ...state, items: updatedItems };
      } else {
        return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    case 'INCREMENT_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    case 'DECREMENT_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
        ).filter(item => item.quantity > 0),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};


export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: JSON.parse(localStorage.getItem('cartItems')) || [] });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = item => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = item => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  const incrementQuantity = item => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: item });
  };

  const decrementQuantity = item => {
    dispatch({ type: 'DECREMENT_QUANTITY', payload: item });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => {
  return useContext(CartContext);
};

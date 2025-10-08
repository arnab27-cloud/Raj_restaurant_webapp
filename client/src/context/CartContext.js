import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      }
      return [...state, { ...action.payload }];
    }

    case 'REMOVE':
      return state.filter(item => item.id !== action.payload);

    case 'DECREMENT':
      return state.map(item =>
        item.id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

    case 'INCREMENT':
      return state.map(item =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case 'CLEAR':
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [deliveryAddress, setDeliveryAddress] = useState('');

  // 📥 Load saved address from localStorage
  useEffect(() => {
    const savedAddress = localStorage.getItem('deliveryAddress');
    if (savedAddress) {
      setDeliveryAddress(savedAddress);
    }
  }, []);

  // 💾 Save address to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('deliveryAddress', deliveryAddress);
  }, [deliveryAddress]);

  const addToCart = item => dispatch({ type: 'ADD', payload: item });
  const removeFromCart = id => dispatch({ type: 'REMOVE', payload: id });
  const decrementQty = id => dispatch({ type: 'DECREMENT', payload: id });
  const incrementQty = id => dispatch({ type: 'INCREMENT', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        decrementQty,
        incrementQty,
        clearCart,
        cartTotal,
        deliveryAddress,
        setDeliveryAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
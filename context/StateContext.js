import React, { createContext, useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Product from "../components/Product";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [qty, setQty] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  let productIndex;
  let foundProduct;
  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    productIndex = cartItems.findIndex((item) => item._id === id);
    if (value === "inc") {
      setCartItems(
        cartItems.map((item) => {
          if (item._id === id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        })
      );
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      (prevTotalQuanties) => prevTotalQuanties + 1;
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems(
          cartItems.map((item) => {
            if (item._id === id) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          })
        );
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        (prevTotalQuantities) => prevTotalQuantities - 1;
      }
    }
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantity(
      (prevTotalQuanties) => prevTotalQuanties - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems?.find(
      (item) => item._id === product._id
    );
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return { ...cartProduct, quantity: cartProduct.quantity + quantity };
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to cart`, {
      duration: 4000,
      position: "top-right",
      style: {
        border: "1px solid #f02d34",
        padding: "16px",
      },
      iconTheme: {
        primary: "#f02d34",
        secondary: "#FFFAEE",
      },
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });
  };
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };
  return (
    <Context.Provider
      value={{
        qty,
        onAdd,
        incQty,
        decQty,
        onRemove,
        showCart,
        cartItems,
        totalPrice,
        setShowCart,
        setCartItems,
        totalQuantity,
        setTotalPrice,
        setTotalQuantity,
        toggleCartItemQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);

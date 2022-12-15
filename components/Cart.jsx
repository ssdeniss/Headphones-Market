import Link from "next/link";
import React from "react";
import {
  AiOutlineLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from "react-icons/ai";
import { IoMdTrash } from "react-icons/io";
import { useStateContext } from "../context/StateContext";
import { useClickOutside } from "../hooks/useClickOutside";
import { urlFor } from "../library/client";

const Cart = () => {
  const {
    onRemove,
    cartItems,
    totalPrice,
    setShowCart,
    totalQuantity,
    toggleCartItemQuantity,
  } = useStateContext();

  const outside = useClickOutside(() => {
    setShowCart(false);
  });
  return (
    <div className="cart-wrapper">
      <div className="cart-container" ref={outside}>
        <button
          className="cart-heading"
          type="button"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantity} items)</span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                className="btn"
                type="button"
                onClick={() => setShowCart(false)}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                <img
                  className="cart-product-image"
                  src={urlFor(item?.image[0])}
                  alt=""
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          style={{
                            dysplay: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus color="#000" />
                        </span>
                        <span
                          className="num"
                          style={{
                            dysplay: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {item.quantity}
                        </span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "inc")
                          }
                          style={{
                            dysplay: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <AiOutlinePlus color="#000" />
                        </span>
                      </p>
                    </div>
                    <button
                      className="btn"
                      type="button"
                      style={{ width: "auto" }}
                      onClick={() => onRemove(item)}
                    >
                      <IoMdTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal: </h3>
              <h3>${totalPrice} </h3>
            </div>
            <div className="btn-container">
              <button className="btn" type="button">
                Pay with stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

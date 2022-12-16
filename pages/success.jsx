import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "../context/StateContext";
import { runFireworks } from "../library/utils";

const success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantity } = useStateContext();
  const [order, setOrder] = useState(null);
  useEffect(() => {
    // localStorage.clear();
    setCartItems([])
    setTotalPrice(0)
    setTotalQuantity(0)
    runFireworks()
  }, []);
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt</p>
        <p className="description">
          If you have anyu questions, please email
          <a className="email" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button className="btn" type="button" width="300px">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default success;

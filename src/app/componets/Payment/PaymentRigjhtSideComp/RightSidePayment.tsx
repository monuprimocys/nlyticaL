"use client";

import React from "react";

import PaymentPayPal from "../PaymentLeftSideComp/PaymentPayPal";
import PaymentStripe from "../PaymentLeftSideComp/PaymentStripe";

function RightSidePayment({ selectedPayment }) {
  let paymentMethod = "";

  switch (selectedPayment) {
    case 1:
      paymentMethod = <PaymentStripe />;
      break;
    case 2:
      paymentMethod = <PaymentPayPal />;
      break;

    default:
      paymentMethod = "No payment method selected";
  }

  return (
    <div className="w-full p-4 border-2 border-gray-200 rounded-lg    h-full shadow-lg">
      <div className="text-lg">{paymentMethod}</div>
    </div>
  );
}

export default RightSidePayment;

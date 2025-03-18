import React from "react";
import PaymentWithStripe from "../LeftSidePayment/PaymwentWithStrip";
import PaymentWithPaypal from "../LeftSidePayment/PaymentWithPaypal";

function RightSidePayment({ selectedPayment }) {
  let paymentMethod = "";

  switch (selectedPayment) {
    case 1:
      paymentMethod = <PaymentWithStripe />;
      break;
    case 2:
      paymentMethod = <PaymentWithPaypal />;
      break;

    default:
      paymentMethod = "No payment method selected";
  }

  return (
    <div className="w-full p-4 border-2 border-gray-200 rounded-lg  h-full shadow-lg">
      <p className="text-lg">{paymentMethod}</p>
    </div>
  );
}

export default RightSidePayment;

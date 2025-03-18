"use client";

import PaymentBreadCome from "@/app/componets/AllBreadCome/PaymentBreadCome";
import Paymentdesing from "@/app/componets/Mybusiness/PaymentComponets/Paymentdesing";
import React from "react";

function Payment() {
  return (
    <div className="  w-full     h-auto ">
      <PaymentBreadCome />
      <div className=" w-full">
        <Paymentdesing />
      </div>
    </div>
  );
}

export default Payment;

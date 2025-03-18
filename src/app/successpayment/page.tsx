"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "../storeApp/Slice/modalSlice";
import Cookies from "js-cookie";

function Successpayment() {
  const dispatch = useDispatch();

  useEffect(() => {
    const vendor_id = Cookies.get("user_id");
    const planName = sessionStorage.getItem("planName");
    const planPrice = sessionStorage.getItem("planPrice");

    const price = planPrice ? planPrice.replace(/[^\d.-]/g, "") : "";

    const data = {
      user_id: vendor_id,
      price: price,
      payment_mode: "stripe",
      plan_name: planName,
      plan_price: planPrice,
    };

    // Call the API when the page loads
    fetch("https://nlytical.theprimocys.com/api/payment-success", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // If the API call is successful, show the modal
        dispatch(showModal("Paymentsuccessful"));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [dispatch]); // Empty dependency array means this will only run once on mount

  return <div></div>;
}

export default Successpayment;

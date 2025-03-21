"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "../storeApp/Slice/modalSlice";
import Cookies from "js-cookie";

function Successpaymentbusiness() {
  const dispatch = useDispatch();

  useEffect(() => {
    const vendor_id = Cookies.get("user_id");
    const planPrice = sessionStorage.getItem("planPrice");
    const goal_id = Cookies.get("sponcer_id");
    const service_id = Cookies.get("service_id");

    const price = planPrice ? planPrice.replace(/[^\d.-]/g, "") : "";

    const data = {
      vendor_id: vendor_id,
      price: price,
      payment_mode: "stripe",
      goal_id: goal_id,
      service_id: service_id,
    };

    // Call the API when the page loads
    fetch("https://nlytical.theprimocys.com/api/goalpayment-success", {
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
        Cookies.set("businesspaymentsuccess","1");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [dispatch]); // Empty dependency array means this will only run once on mount

  return <div></div>;
}

export default Successpaymentbusiness;

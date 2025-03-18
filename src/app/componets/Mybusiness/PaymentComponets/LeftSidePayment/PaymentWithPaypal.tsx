import React, { useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useAppSelector } from "@/app/hooks/hooks";
import Cookies from "js-cookie";

function PaymentWithPaypal() {
  const paypalClientId =
    "AVzMVWctLyouPgmfv9Nh6E5KakydG4JHiFGm-fgg6HRqFYUW-gHVKS1ebRfPgDOr2uYABGGcnU_3RaSL"; 

  const campaignGoal = useAppSelector((state) => state.campaignGoal);
  const vendor_id = Cookies.get("user_id");

  const staticData = {
    goal_id: campaignGoal.goalId,
    vendor_id: vendor_id,
    price: campaignGoal.price,
    payment_mode: "paypal",
  };

  const handlePaymentSuccess = async (paymentDetails) => {
    try {
      const response = await fetch(
        "https://nlytical.theprimocys.com/api/goalpayment-success",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...staticData,
            payment_details: paymentDetails,
          }),
        }
      );

      const result = await response.json();
      if (result.success) {
        alert("Payment processed successfully!");
      } else {
        alert("Payment processing failed.");
      }
    } catch (error) {
      console.error("Error sending payment data: ", error);
      alert("An error occurred while processing your payment.");
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": paypalClientId }}>
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "blue",
          shape: "rect",
          label: "paypal",
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: campaignGoal.price, // Amount for payment
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert(
              "Payment Successful! Thank you " + details.payer.name.given_name
            );
            handlePaymentSuccess(details); // Send the payment details to your API
          });
        }}
        onError={(err) => {
          console.error("PayPal Error: ", err);
          if (err) {
            console.log("Error Details: ", err.details); // Inspect specific error details
          }
          alert("An error occurred. Please try again.");
        }}
      />
    </PayPalScriptProvider>
  );
}

export default PaymentWithPaypal;

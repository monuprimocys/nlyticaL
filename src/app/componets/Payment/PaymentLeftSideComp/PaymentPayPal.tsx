import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Cookies from "js-cookie";
import Head from "next/head";

function PaymentPayPal() {
  const paypalClientId =
    "AVzMVWctLyouPgmfv9Nh6E5KakydG4JHiFGm-fgg6HRqFYUW-gHVKS1ebRfPgDOr2uYABGGcnU_3RaSL"; // Replace with your PayPal client ID

  const vendor_id = Cookies.get("user_id");
  const planName = sessionStorage.getItem("planName");
  const planPrice = sessionStorage.getItem("planPrice");

  // Logging the retrieved price values for debugging
  console.log("Plan price from sessionStorage:", planPrice);

  // Parse the price from string to a number, removing any non-numeric characters
  const price = planPrice ? planPrice.replace(/[^\d.-]/g, "") : "";

  // Static data to send with the payment details
  const staticData = {
    user_id: vendor_id,
    price: price,
    payment_mode: "paypal",
    plan_name: planName,
  };

  // State to store the exchange rate
  const [exchangeRate, setExchangeRate] = useState(1); // Default exchange rate (1:1 for USD)
  const [currencyCode, setCurrencyCode] = useState("USD"); // Default to USD
  const [loading, setLoading] = useState(false);

  // Function to fetch exchange rate dynamically based on the user's currency
  const fetchExchangeRate = async (currencyCode) => {
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
      const data = await response.json();
      const rate = data.rates[currencyCode]; // Get the rate for the given currency code
      if (rate) {
        setExchangeRate(rate); // Update the exchange rate state
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      alert("Unable to fetch the exchange rate. Defaulting to 1:1.");
      setExchangeRate(1); // Default to 1:1 if fetching fails
    }
  };

  // Function to get user's country and currency (Using a geolocation API or IP service)
  const getUserCountryAndCurrency = async () => {
    try {
      // Example IP-based geolocation service (replace with a real API or a more accurate method)
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      const userCountry = data.country_name;  // Get country name
      const userCurrency = data.currency;  // Get the user's currency code
      setCurrencyCode(userCurrency);
      fetchExchangeRate(userCurrency);  // Fetch the exchange rate for the currency
    } catch (error) {
      console.error("Error getting user's country and currency:", error);
      alert("Unable to fetch country and currency information. Defaulting to USD.");
      setCurrencyCode("USD");
      fetchExchangeRate("USD");
    }
  };

  useEffect(() => {
    getUserCountryAndCurrency();
  }, []);

  // Convert the planPrice to USD based on the dynamically fetched exchange rate
  const planPriceInUSD =
    price && !isNaN(price) ? parseFloat(price) / exchangeRate : 0;

  // Logging the converted price for debugging
  console.log("Converted Price in USD:", planPriceInUSD);

  // Function to handle successful payment
  const handlePaymentSuccess = async (paymentDetails) => {
    try {
      const response = await fetch(
        "https://nlytical.theprimocys.com/api/payment-success",
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
    <>
      <Head>
        {/* Dynamically load the PayPal SDK script */}
        <script
          src={`https://www.paypal.com/sdk/js?client-id=${paypalClientId}&components=buttons`}
          strategy="afterInteractive"
        ></script>
      </Head>

      <PayPalScriptProvider options={{ "client-id": paypalClientId }}>
        {loading ? (
          <div>Loading exchange rate...</div>
        ) : (
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
                      value: planPriceInUSD.toFixed(2), // Ensure value is in correct format
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
        )}
      </PayPalScriptProvider>
    </>
  );
}

export default PaymentPayPal;

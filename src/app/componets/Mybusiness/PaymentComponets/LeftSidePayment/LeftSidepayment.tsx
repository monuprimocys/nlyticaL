import React from "react";
import debitcardicon from "../../../../../../public/assets/Image/debitcard.png";
import Image from "next/image";
import { MdChevronRight } from "react-icons/md";
import paypal from "../../../../../../public/assets/Image/paypal.png";
import googlpay from "../../../../../../public/assets/Image/goolepay.png";

function LeftSidePayment({ selectedPayment, setSelectedPayment }) {
  const handlePaymentSelection = (paymentId) => {
    setSelectedPayment(paymentId);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div
        className={`w-full flex justify-between cursor-pointer items-center shadow-lg rounded-lg p-4 ${
          selectedPayment === 1 ? "bg-[#0046AE17]" : ""
        }`}
        onClick={() => handlePaymentSelection(1)}
      >
        <div className="flex items-center justify-center gap-2">
          <Image
            src={debitcardicon}
            alt="Debit and Credit Card"
            className="w-8 h-8"
          />
          <p className="text-lg font-normal font-poppins">
            Debit & Credit Card
          </p>
        </div>
        <div>
          <MdChevronRight size={24} />
        </div>
      </div>

      <div
        className={`w-full flex justify-between cursor-pointer items-center shadow-lg rounded-lg p-4 ${
          selectedPayment === 2 ? "bg-[#0046AE17]" : ""
        }`}
        onClick={() => handlePaymentSelection(2)}
      >
        <div className="flex items-center justify-center gap-2">
          <Image src={paypal} alt="PayPal" className="w-8 h-8" />
          <p className="text-lg font-normal font-poppins">PayPal</p>
        </div>
        <div>
          <MdChevronRight size={24} />
        </div>
      </div>
      {/* 
      <div
        className={`w-full flex justify-between cursor-pointer items-center shadow-lg rounded-lg p-4 ${
          selectedPayment === 3 ? "bg-[#0046AE17]" : ""
        }`}
        onClick={() => handlePaymentSelection(3)}
      >
        <div className="flex items-center justify-center gap-2">
          <Image src={googlpay} alt="Google Pay" className="w-8 h-8" />
          <p className="text-lg font-normal font-poppins">Google Pay</p>
        </div>
        <div>
          <MdChevronRight size={24} />
        </div>
      </div> */}
    </div>
  );
}

export default LeftSidePayment;

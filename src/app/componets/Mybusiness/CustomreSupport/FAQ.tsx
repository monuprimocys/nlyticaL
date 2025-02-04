"use client";

import React, { useState } from "react";
import Image from "next/image";
import questionImage from "../.././../../../public/assets/Image/message-question.png";
import dropdownImage from "../../../../../public/assets/Image/dropdwonicon.png";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { UseGetFaq } from "@/app/store/api/UseGetFaq";

function FAQ() {
  // State to manage the toggle of the main accordion
  const [isOpen, setIsOpen] = useState(false);

  // State to manage the individual accordion items open/close state
  const [openItem, setOpenItem] = useState(null);

  // Toggle the main accordion visibility
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // Toggle the individual FAQ item (open/close)
  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index); // Close if the same item is clicked, otherwise open it
  };

  const { data } = UseGetFaq();

  console.log("my accord data", data);

  return (
    <div className="mx-auto 2xl:w-[55%]  rounded-b-lg xl:w-[80%] shadow-xl w-[90%] mt-[3rem] gap-5 flex justify-center flex-col items-center cursor-pointer">
      {/* FAQ Header */}
      <div
        className="w-full justify-between items-center businesslable flex h-auto p-8 rounded-xl"
        onClick={toggleAccordion} // On click, toggle the main accordion
      >
        <div className="flex gap-4 items-center">
          <Image
            className="w-[2rem] h-[2rem] object-contain"
            src={questionImage}
            alt="question"
          />
          <h5 className="text-lg font-medium font-poppins">FAQ</h5>
        </div>
        {/* Dropdown Icon */}
        <div className="flex gap-2">
          <Image
            className={`w-[1.5rem] h-[1.5rem] object-contain transition-transform ${
              isOpen ? "rotate-180" : ""
            }`} // Rotate icon on open
            src={dropdownImage}
            alt="dropdown"
          />
        </div>
      </div>

      {/* Accordion Content multiple accordions */}
      {isOpen && (
        <div className="w-full flex flex-col p-4 md:p-6 justify-start items-start gap-6">
          {data?.data?.map((faq, index) => (
            <div key={faq.id} className="w-full bg-transparent rounded-b-xl">
              <div className="w-full justify-between items-center p-3 md:p-5 flex">
                <h5 className="text-lg font-medium font-poppins">
                  {faq.question}
                </h5>
                <div className="flex gap-2">
                  {/* Toggle icon based on whether the item is open or closed */}
                  <span onClick={() => toggleItem(index)}>
                    {openItem === index ? <FaMinus /> : <FaPlus />}
                  </span>
                </div>
              </div>
              {/* Content for the FAQ */}
              {openItem === index && (
                <ul className="mt-3 px-5 rounded-lg  py-1 md:py-3 bg-[#1C2D6B21]">
                  <li className="mb-2 text-[#7D7D7D] font-poppins">
                    {faq.answer}
                  </li>
                </ul>
              )}

              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FAQ;

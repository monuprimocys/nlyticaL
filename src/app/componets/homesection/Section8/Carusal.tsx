"use client";

import { useRef } from "react";
import Slider from "react-slick";
import { RiArrowRightWideFill } from "react-icons/ri";
import { RiArrowLeftWideFill } from "react-icons/ri";
// Make sure slick-carousel's CSS is loaded globally.
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./Card";
import homeSection8CardData from "./Data";

function CausalSection8() {
  const sliderRef = useRef(null); // Create a ref for the slider

  // Slick slider settings with breakpoints
  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200, // When the screen width is <= 1200px
        settings: {
          slidesToShow: 2, // Show 2 slides
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 992, // When the screen width is <= 992px
        settings: {
          slidesToShow: 2, // Show 2 slides
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 600, // When the screen width is <= 600px
        settings: {
          slidesToShow: 1, // Show 1 slide
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
        },
      },
    ],
  };

  return (
    <div className="w-full flex items-center justify-center  flex-col xl:flex-row ">
      {/* Previous Button */}
      <div className="flex justify-center items-center hidden xl:block">
        <RiArrowLeftWideFill
          size={30}
          className="cursor-pointer hover:text-[#0046AE]   text-[#0046AE7D]"
          aria-label="Previous"
          onClick={() => sliderRef.current.slickPrev()} // Trigger previous slide on click
        />
      </div>

      <div className="w-full  ">
        {/* Slider component with ref */}
        <Slider {...settings} ref={sliderRef}>
          {/* Cards */}
          {homeSection8CardData.map((card, index) => (
            <div key={index} className="px-2 ">
              <Card
                key={index}
                avatar={card.avatar}
                title={card.title}
                name={card.name}
                position={card.position}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Next Button */}
      <div className="flex justify-center items-center hidden xl:block   relative  right-3 text-[#0046AE7D]">
        <RiArrowRightWideFill
          size={30}
          className="cursor-pointer hover:text-[#0046AE]"
          aria-label="Next"
          onClick={() => sliderRef.current.slickNext()} // Trigger next slide on click
        />
      </div>

      <div className=" w-full flex justify-center items-center gap-4 ">
        <div className="flex justify-center items-center  xl:hidden">
          <RiArrowLeftWideFill
            size={30}
            className="cursor-pointer hover:text-[#0046AE]   text-[#0046AE7D]"
            aria-label="Previous"
            onClick={() => sliderRef.current.slickPrev()} // Trigger previous slide on click
          />
        </div>
        <div className="flex justify-center items-center  xl:hidden  relative  right-3 text-[#0046AE7D]">
          <RiArrowRightWideFill
            size={30}
            className="cursor-pointer hover:text-[#0046AE]"
            aria-label="Next"
            onClick={() => sliderRef.current.slickNext()} // Trigger next slide on click
          />
        </div>
      </div>
    </div>
  );
}

export default CausalSection8;

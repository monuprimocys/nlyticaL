import Heading from "../Heading/Heading";
import homeSectionMainCardData from "./Section5/data";
import Section5card from "./Section5card";

function Section7() {
  return (
    <div className="w-full h-auto mt-[6rem] ">
      <div className="w-[90%] sm:w-[85%] md:w-[90%]  2xl:w-[65%] mx-auto flex flex-wrap xl:flex-nowrap justify-between gap-4 items-center flex-col">
        {/* Center content */}

        <div className=" w-full xl:pt-[1.8rem]">
          <Heading title="Top Trending" highlightedTitle="Perfect store" />
        </div>

        {/* Arrows and Cards in a row */}
        <div className=" items-center justify-between w-full  mt-10  grid grid-cols-1 md:grid-cols-2  gap-5  xl:grid-cols-3">
          {homeSectionMainCardData.map((card, index) => (
            <Section5card
              key={index}
              mainimage={card.mainimage}
              category={card.category}
              avatar={card.avatar}
              name={card.name}
              businessName={card.businessName}
              reviews={card.reviews}
              yearsInBusiness={card.yearsInBusiness}
              location={card.location}
              priceRange={card.priceRange}
              featured={card.featured}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Section7;

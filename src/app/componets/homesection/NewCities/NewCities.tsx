import React from "react";
import NewCitiesCard from "./NewCitiesCard";
import Heading from "../../Heading/Heading";
import { useHomeScreenApi } from "@/app/store/api/useHomeScreenApi";
import { useHomeScreenSettingApi } from "@/app/store/api/useHomeScreenSettingApi";

function NewCities() {
  const { data, isLoading, refetch } = useHomeScreenApi();

  const carddata = data?.new_cities.cities;
  const { data: settingHome } = useHomeScreenSettingApi();
  
    if (settingHome?.data[4].status == 0) {
      return null;
    }
  return (
    <div className="w-full h-auto mt-[6rem]">
      <div className="w-[90%] sm:w-[85%] md:w-[90%] 2xl:w-[80%] mx-auto">
        <div className="w-full xl:pt-[1.8rem]">
          <Heading
            title="Explore Top"
            highlightedTitle={data?.new_cities.title}
          />
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-cols-1 mt-[3rem] gap-8 2xl:gap-10 w-full">
          {carddata?.map((item, index) => (
            <NewCitiesCard key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewCities;

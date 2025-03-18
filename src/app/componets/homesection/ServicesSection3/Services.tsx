"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NewCardDesingHome from "./NewCardDesingHome";
import { useHomeScreenApi } from "@/app/storeApp/api/useHomeScreenApi";
import Cardbtn from "./Cardbtn";
import { useHomeScreenSettingApi } from "@/app/storeApp/api/useHomeScreenSettingApi";

function Services() {
  const router = useRouter();
  const { data, isLoading, refetch } = useHomeScreenApi();
  const { data: settingHome } = useHomeScreenSettingApi();

  if (settingHome?.data[1].status == 0) {
    return null;
  }

  return (
    <div className="w-full h-auto md:mt-10 overflow-hidden">
      <div className="w-full md:w-[85%] xl:w-[85%] mx-auto flex items-center justify-between flex-col md:flex-row overflow-hidden">
        <div className="w-[90%] md:w-[85%] xl:w-[92%] 2xl:w-[85%] mx-auto justify-items-center grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-9 gap-6">
          {data?.categories.map((category, index) => (
            <NewCardDesingHome
              key={index}
              category_image={category.category_image}
              title={category.category_name}
              total={category.subcategory_count}
              subCategoryId={category.id} // Pass the subCategory ID
            />
          ))}
          <Cardbtn /> 
        </div>
      </div>
    </div>
  );
}

export default Services;

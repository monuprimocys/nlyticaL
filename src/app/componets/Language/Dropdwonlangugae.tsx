import Image from "next/image";
import React, { useState, useEffect } from "react";
import languageicon from "../../../../public/assets/Image/language.png";
import dropdwonicon from "../../../../public/assets/Image/dropdwonicon.png";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { useListAllLanguages } from "@/app/storeApp/api/Language/uselistAllLanguages";
import { useFetchDefaultLanguage } from "@/app/storeApp/api/Language/useFetchDefaultLanguage";
import { setLanguage } from "@/app/storeApp/Slice/languageSlice";

function DropdwonLanguage() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const { data, isLoading, isError } = useListAllLanguages();
  const { mutate: fetchDefaultLanguage, data: defaultdata } =
    useFetchDefaultLanguage();

  const [selectedLanguage, setSelectedLanguage] = useState({
    language: "English",
    status_id: 1,
    country: "US",
    language_alignment: "ltr",
    default_status: 1,
  });





  const [isOpenlanguage, setIsOpenLanguage] = useState(false);
  const dispatch = useAppDispatch();

  console.log("Default language data:", defaultdata);

  // Fetch default language when the page loads
  useEffect(() => {
    const storedLanguage = localStorage.getItem("selectedLanguage");

    console.log("Stored language data:", storedLanguage);
    
    if (storedLanguage) {
      setSelectedLanguage(JSON.parse(storedLanguage));
    } else {
      fetchDefaultLanguage(1); // Fetch language data using default status_id 1
    }
  }, []);

  useEffect(() => {
    if (defaultdata) {
      console.log("Fetched default language data:", defaultdata.results);

      const detectedLanguage = defaultdata.language || "Hindi"; // Default to Hindi if not provided
      const detectedAlignment = defaultdata.language_alignment || "ltr"; // Default to LTR if not provided

      dispatch(
        setLanguage({
          language: detectedLanguage,
          language_alignment: detectedAlignment,
          translations: defaultdata.results || [], // Ensure it's always an array
        })
      );
    }
  }, [defaultdata, dispatch]);

  const translatelanguage = useAppSelector(
    (state) => state.language.translations
  );

  console.log("Translated language data:", translatelanguage);

  const handleLanguageSelection = async (
    language,
    status_id,
    country,
    language_alignment,
    default_status
  ) => {
    const selectedData = {
      language,
      status_id,
      country,
      language_alignment,
      default_status,
    };

    setSelectedLanguage(selectedData);
    localStorage.setItem("selectedLanguage", JSON.stringify(selectedData));
    setIsOpenLanguage(false);

    try {
      await fetchDefaultLanguage({ status_id }); // Fetch new language data
    } catch (error) {
      console.error("Error fetching language:", error);
    }
  };

  return (
    <div className="w-full h-auto">
      <div className="flex items-center justify-between">
        {/* Language Icon Button */}
        <button className="z-10 inline-flex items-center py-2.5 text-sm font-medium text-black">
          <div className="h-6 w-6">
            <Image
              src={languageicon}
              alt="Language Icon"
              width={24}
              height={24}
            />
          </div>
        </button>

        {/* Language Selector */}
        <div
          className="group relative cursor-pointer p-2 sm:p-3"
          onMouseEnter={() => setIsOpenLanguage(true)}
          onMouseLeave={() => setIsOpenLanguage(false)}
        >
          <div className="flex items-center gap-2">
            <p className={`${isDarkMode ? "text-[#FFFFFFCC]" : "text-black"}`}>
              {selectedLanguage.language}
            </p>
            <div className="h-5 w-5">
              <Image
                src={dropdwonicon}
                alt="Dropdown Icon"
                width={20}
                height={20}
                className={`transform ${isOpenlanguage ? "rotate-180" : ""}`}
              />
            </div>
          </div>

          {/* Dropdown menu */}
          {isOpenlanguage && (
            <div
              className={`absolute left-0 top-12 z-50 w-[10rem] rounded border shadow transition-all duration-300 ease-out ${
                isDarkMode ? "text-[#FFFFFFCC] bg-[#212121]" : "bg-white"
              }`}
            >
              <ul className="w-full">
                {data?.languages?.map((lang) => (
                  <li
                    key={lang.status_id}
                    className="cursor-pointer p-3 hover:bg-gray-200"
                    onClick={() =>
                      handleLanguageSelection(
                        lang.language,
                        lang.status_id,
                        lang.country,
                        lang.language_alignment,
                        lang.default_status
                      )
                    }
                  >
                    {lang.language}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DropdwonLanguage;

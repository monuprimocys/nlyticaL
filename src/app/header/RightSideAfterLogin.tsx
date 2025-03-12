"use client";

import { FiChevronDown } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { HiOutlineLogout } from "react-icons/hi";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUpdateProfileMutation } from "../storeApp/api/auth/ProfileUpdate";
import { ProfileUpdate } from "../types/Restypes";
import { toast } from "react-hot-toast";
import { showModal } from "../storeApp/Slice/modalSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import avatar from "../../../public/assets/Image/defaultimage.png";

const RightSideAfterLogin = () => {
  const router = useRouter();
  const user_id = Cookies.get("user_id");

  const [isLoading, setIsLoading] = useState(true);
  const [userProfileData, setUserProfileData] = useState<ProfileUpdate | null>(
    null
  );

  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  console.log(" my user detail from update api ", userProfileData);

  const [triggerUpdateProfile] = useUpdateProfileMutation();

  useEffect(() => {
    if (user_id) {
      triggerUpdateProfile({ user_id })
        .then((response) => {
          if (response?.data) {
            setUserProfileData(response?.data);

            console.log(" my responce api ", response?.data?.is_store);
            Cookies.set("is_store", response?.data?.is_store);
            Cookies.set("store_approval", response?.data?.store_approval);
            Cookies.set("service_id", response?.data?.service_id);
            Cookies.set("subscriber_user", response.data?.subscriber_user);
            Cookies.set("sponcer_id", response.data.campaign);
            Cookies.set("email", response.data.userdetails.email);
            Cookies.set("mobile", response.data.userdetails.mobile);
            Cookies.set(
              "plane_name",
              response.data?.subscriptionDetails.plan_name.split(" ")[0]
            );
          }
        })
        .finally(() => {
          setIsLoading(false); // Set loading to false after response
        });
    } else {
      setIsLoading(false); // If no user_id, just stop loading
    }
  }, [user_id, triggerUpdateProfile]);

  const handleProfileClick = () => {
    router.push("/Profile");
  };

  const handleMybusinessClick = () => {
    router.push("/bussines");
  };

  const handleLogoutClick = () => {
    dispatch(showModal("LogoutModal"));
  };

  const isStore = Cookies.get("store_approval");

  return (
    <div className="flex items-center gap-4 text-white      justify-between ">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md    py-1.5 text-sm/6 focus:outline-none">
          <div className="flex items-center gap-2">
            {/* Profile Picture */}
            <div className="h-12 w-12 overflow-hidden rounded-full">
              <Image
                className="h-full w-full object-cover"
                src={userProfileData?.userdetails?.image || avatar}
                alt="Profile Pic"
                width={100}
                height={100}
              />
            </div>

            {/* Display Name and Dropdown Icon */}
            <div className="hidden items-center gap-2 text-lg text-black lg:flex">
              {/* <span>{userProfileData?.userdetails?.name || "User"}</span> */}
              <FiChevronDown
                className={`  ${isDarkMode ? "text-white" : "text-black"}   `}
              />
            </div>
          </div>
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className={`w-40 origin-top-right rounded-xl border border-white z-50  p-1 text-sm/6 shadow-2xl transition duration-200 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0    ${
            isDarkMode ? "bg-[#212121] text-white" : "bg-white text-black"
          } `}
        >
          <MenuItem>
            <button
              onClick={handleProfileClick}
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 pl-6 data-[focus]:bg-dropdownOptionHover"
            >
              <CgProfile className="text-xl" />
              <span>My Account</span>
            </button>
          </MenuItem>

          {/* Show "My business" only if is_store is 1 */}

          <MenuItem>
            <button
              onClick={handleMybusinessClick}
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 pl-6 data-[focus]:bg-dropdownOptionHover"
            >
              <CgProfile className="text-xl" />
              <span>My business</span>
            </button>
          </MenuItem>

          <MenuItem>
            <button
              onClick={handleLogoutClick}
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 pl-6 text-red-500 data-[focus]:bg-dropdownOptionHover"
            >
              <HiOutlineLogout className="text-xl" />
              <span>Logout</span>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default RightSideAfterLogin;

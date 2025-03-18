"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileMutation } from "@/app/storeApp/api/auth/ProfileUpdate";
import { useUserChatList } from "@/app/storeApp/api/message/userChatList";
import Cookies from "js-cookie";
import { FiMenu, FiX } from "react-icons/fi"; // Import menu and close icons
import Image from "next/image";
import MessageSerchBox from "./MessageSerchBox";
import { setSelectedUser } from "@/app/storeApp/Slice/userSlice";
import { User } from "@/app/types/Restypes";
import { useAppSelector } from "@/app/hooks/hooks";

function LeftSideBox() {
  const user_id = Cookies.get("user_id");
  const dispatch = useDispatch();
  const [triggerUpdateProfile, { data, isLoading }] =
    useUpdateProfileMutation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Fetch the search query from Redux store
  const searchQuery = useSelector(
    (state: { search: { query: string } }) => state.search.query
  );

  useEffect(() => {
    if (user_id) {
      triggerUpdateProfile({ user_id });
    }
  }, [user_id, triggerUpdateProfile]);

  // Pass the search query to the API hook
  const { data: userlist, refetch } = useUserChatList(searchQuery);

  console.log(" my api values~~~~@ ", userlist);

  useEffect(() => {
    refetch();
  }, [userlist]);

  //  when page realod then slice values null

  const handleUserClick = (user: User) => {
    refetch();
    dispatch(
      setSelectedUser({
        id: user.id,
        second_id: user.second_id,
        firstName: user.first_name,
        lastName: user.last_name,
        profilePic: user.profile_pic || "/assets/Image/Avatar_img_2.jpg", // Default image if none exists
        lastMessage: user.last_message,
        lastSeen: user.last_seen,
        isOnline: user.is_online === 1, // Convert 1/0 to boolean for online status
        unreadMessageCount: user.unread_message,
        userRole: user.user_role,
        time: user.time,
        isBlocked: user.is_block === 1, // Convert 1/0 to boolean for block status
      })
    );
    refetch();
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={`relative w-full shadow-lg   h-screen  overflow-y-auto   ${
        isDarkMode ? " bg-[#212121]  rounded-l-lg" : ""
      } `}
    >
      {/* Menu Icon for small screens */}
      <div
        className="block md:hidden p-4 cursor-pointer absolute right-0 z-50"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <FiX className="text-2xl" />
        ) : (
          <FiMenu className="text-2xl" />
        )}
      </div>

      {/* LeftSideBox (Visible only on larger screens and when menu is open) */}
      <div
        className={`p-4 flex flex-col gap-6 rounded-l-lg transition-all duration-300 ease-in-out md:block absolute md:relative w-[90%] xl:w-full left-0 top-0 h-full z-10 transform ${
          menuOpen
            ? "translate-x-0 z-50 h-screen bg-white"
            : "-translate-x-full hidden"
        } md:translate-x-0`}
      >
        {/* Static chat name */}
        <div className="mt-[1rem]">
          <p
            className={`font-poppins  font-normal text-lg   ${
              isDarkMode ? "text-gray-200" : "text-black"
            }`}
          >
            Chat
          </p>
        </div>

        {/* Search box */}
        <div className="mt-[1rem] hidden md:block">
          <MessageSerchBox />
        </div>

        {/* List user chats dynamically */}
        <div className="cursor-pointer">
          {/* Check if no users were found */}
          {userlist?.chat_list?.length === 0 ? (
            <p
              className={`text-center  mt-4 ${
                isDarkMode ? " text-white" : "text-gray-500"
              }`}
            >
              No users found matching your search criteria.
            </p>
          ) : (
            userlist?.chat_list?.map((user: ChatList) => (
              <div
                key={user.id}
                className="w-full flex items-center justify-between py-4 border-b border-gray-200"
                onClick={() => handleUserClick(user)}
              >
                {/* User Profile Pic */}
                <div className="flex-shrink-0 relative ">
                  <Image
                    className="rounded-full w-[60px] h-[60px] object-cover"
                    src={user.profile_pic || "/assets/Image/Avatar_img_2.jpg"}
                    alt={` ${user.last_name} profile`}
                    width={60}
                    height={60}
                  />
                  {/*  when online then grenn esle red  */}
                  {user.is_online !== undefined && (
                    <div className="relative">
                      <div
                        className={`absolute bottom-0 right-1 rounded-full h-3 w-3 ${
                          user.is_online ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                    </div>
                  )}
                </div>

                <div className=" w-full h-full  flex justify-between items-center">
                  <div className="flex-1 justify-start items-center ml-4 flex-col">
                    {/* Username */}
                    <h3
                      className={`font-poppins  font-semibold text-lg hover:text-[#0046AE] cursor-pointer transition duration-200 line-clamp-1  ${
                        isDarkMode ? "text-gray-200" : "text-black"
                      }`}
                    >
                      {user.first_name} {user.last_name}
                    </h3>

                    {/* Last Message */}
                    <p className="font-poppins text-[#A4A4A4] font-normal text-sm truncate max-w-[180px]">
                      {user.last_message}
                    </p>
                  </div>

                  {/* Time and Message Count */}
                  <div className="flex flex-col   h-full gap-2 items-center justify-center">
                    {/* Time */}
                    <p className="font-poppins text-[#A4A4A4] text-[12px]">
                      {user.time}
                    </p>

                    {/* Unread Message Count */}
                    {user.unread_message > 0 && (
                      <div className="relative mt-1">
                        <div className="h-5 w-5 rounded-full bg-[#0046AE] flex justify-center items-center text-xs text-white absolute -top-2 -right-2">
                          {user.unread_message}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* User Details */}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default LeftSideBox;

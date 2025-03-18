"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import infoCircle from "../../../../../public/assets/Image/info-circle2.png";
import sendicon from "../../../../../public/assets/Image/Send.png";
import { useAppSelector } from "@/app/hooks/hooks";

import Cookies from "js-cookie";
import "./messageBoxstyle.css";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import crossicon from "../../../../../public/assets/Image/cross.png";
import pdficon from "../../../../../public/assets/Image/pdf_icons.png";
import emojiicon from "../../../../../public/assets/Image/emozi.png";
import EmojiPicker from "emoji-picker-react";
import pdficon1 from "../../../../../public/assets/Image/pdfimage.png";
import { useInnerChatList } from "@/app/storeApp/api/message/useInnerChatList";
import { useAddChatListMutation } from "@/app/storeApp/api/message/AddChatList";
import {
  setDocument,
  setImage,
} from "@/app/storeApp/Slice/MessageSliceFileAndDoc";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";
import { useUserChatList } from "@/app/storeApp/api/message/userChatList";
import FirstTimeStartChat from "./FirstTimeStartChat";
import ImageModalMessage from "./ImageModalMessage";
import ImageModalRightSide from "./ImageModalRightSide";
function RightSideBox() {
  const lastSegment = Cookies.get("detail_id");

  const searchQuery = "";

  // Only make the API call if lastSegment exists
  const { data: detaildata, refetch: detailrefetch } = lastSegment
    ? useServiceDetailApi(lastSegment)
    : { data: null, refetch: () => {} }; // return a default/fallback value when no lastSegment

  // Log the response for debugging
  console.log(
    "API response:@@@@@@@@@@@@@@@@@@@@@@!!@",
    detaildata?.vendorDetails?.is_online
  );

  const { refetch: userlistrefetch, data: chatlistdata } =
    useUserChatList(searchQuery);

  const userselected = useAppSelector((state) => {
    return state.userSlice;
  });

  console.log(
    " my   user selected values detail details",
    userselected.selectedUser
  );

  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const usedispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [selectedImage, setSelectedImage] = useState(null);

  const [RightSideImage, setRightSideImage] = useState(null);

  const to_user =
    userselected.selectedUser?.second_id || detaildata?.vendorDetails.id;

  console.log("user selected emojis selected to_user", to_user);

  const from_user = Cookies.get("user_id");
  const { data, refetch } = useInnerChatList(from_user, to_user);

  const chatMessages = data?.chatMessages;

  console.log(" my chat chatMessages", chatMessages);

  const doc = useAppSelector((state) => state.MessageSliceFileAndDoc.document);
  const image = useAppSelector((state) => state.MessageSliceFileAndDoc.image);

  console.log(" my seleted doc", doc);

  const [message, setMessage] = useState("");
  const [addChatList, { isError, isSuccess, error }] = useAddChatListMutation();

  // Emoji Handling
  const handleEmojiClick = (event) => {
    // Set the selected emoji
    setSelectedEmoji(event.emoji);

    // Append the selected emoji to the current message
    setMessage((prevMessage) => prevMessage + event.emoji);

    // Hide the emoji picker after selection
    setEmojiPickerVisible(false);
  };

  // Message Sending Function
  const handleSendMessage = async () => {
    if (message.trim() === "" && !doc && !image) return; // Don't send empty messages or attachments

    const formData = new FormData();

    // Add message, doc, and image to the FormData
    if (doc) {
      formData.append("type", "doc");
      formData.append("url", doc); // Document URL or path
    } else if (image) {
      formData.append("type", "image");
      formData.append("url", image); // Image URL or path
    } else {
      formData.append("type", "message");
      formData.append("message", message); // Add text message with emoji
    }

    // Add user information (from_user, to_user)
    formData.append("from_user", from_user);
    formData.append("to_user", to_user || detaildata?.vendorDetails.id);

    setIsLoading(true); // Set loading to true when API call starts

    try {
      const response = await fetch("https://nlytical.theprimocys.com/api/add-chat", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error sending message");
      }

      await response.json(); // Process the response if needed
      setMessage(""); // Clear message input
      refetch(); // Refresh the chat list
      usedispatch(setImage(null)); // Clear image
      usedispatch(setDocument(null)); // Clear document
      userlistrefetch();
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setIsLoading(false); // Set loading to false when API call finishes
    }
  };

  // Handle Enter key press event to trigger the send message function
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      handleSendMessage(); // Call the function when Enter is pressed and no loading
    }
  };
  const handleRemoveDoc = () => {
    usedispatch(setDocument(null)); // Dispatch action to clear the document
  };

  const handleRemoveImage = () => {
    usedispatch(setImage(null)); // Dispatch action to clear the image
  };

  const chatContainerRef = useRef(null); // Reference for chat container

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]); // Trigger whenever chatMessages change

  console.log(" responce from inner chat list!!!!!!!!!!!!! ", to_user);

  // user chat list length

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    //   data values not exit then not show all componet
    <div
      className={`w-full h-[32rem] md:h-[49rem] relative overflow-hidden    ${
        isDarkMode ? "  bg-[#212121]" : ""
      } `}
    >
      <>
        {to_user ? (
          <>
            <div className="w-full flex items-center  justify-between bg-[#0046AE] py-4 px-6 rounded-tr-xl rounded-br-xl">
              <div className="  flex justify-start items-center">
                <div
                  className="rounded-full w-[60px] h-[60px] object-cover"
                  style={{
                    backgroundImage: `url(${
                      userselected.selectedUser?.profilePic ||
                      detaildata?.vendorDetails.image
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="ml-4">
                  <div
                    className="flex items-center space-x-2 cursor-pointer  "
                    // onClick={() => {
                    //   if (data?.to_user_details?.role === "vendor") {
                    //     usedispatch(showModal("VendorInfoModal"));
                    //     sessionStorage.setItem(
                    //       "selecteduserid",
                    //       data.to_user_details.id
                    //     );
                    //   }
                    // }}
                  >
                    <h2 className="text-white font-medium text-lg font-poppins">
                      {userselected.selectedUser?.firstName ||
                        detaildata?.vendorDetails.first_name}
                      <span>
                        {" "}
                        {userselected.selectedUser?.lastName ||
                          detaildata?.vendorDetails.last_name}
                      </span>
                    </h2>
                    <div
                      className=""
                      // onClick={() => {
                      //   if (data?.to_user_details?.role === "vendor") {
                      //     usedispatch(showModal("VendorInfoModal"));
                      //     sessionStorage.setItem(
                      //       "selecteduserid",
                      //       data.to_user_details.id
                      //     );
                      //   }
                      // }}
                    >
                      {/* <Image
                        src={infoCircle}
                        alt="Info Icon"
                        className="w-[16px] h-[16px]"
                      /> */}
                    </div>
                  </div>

                  <div className="flex items-center text-[#E6E6E6] mt-1">
                    <span className="text-sm font-normal font-poppins">
                      {data?.to_user_details.status ||
                      detaildata?.vendorDetails.is_online === 1
                        ? "Online"
                        : "Offline"}
                    </span>
                  </div>
                </div>
              </div>
              {/* view profile */}

              {data?.to_user_details?.role === "vendor" && (
                <div
                  className="flex justify-end items-center"
                  onClick={() => {
                    usedispatch(showModal("VendorInfoModal"));
                    sessionStorage.setItem(
                      "selecteduserid",
                      data.to_user_details.id
                    );
                  }}
                >
                  <button className="text-[#0046AE]  px-4 py-2 rounded-lg   bg-white font-poppins">
                    View profile
                  </button>
                </div>
              )}
            </div>

            <div
              className="w-full h-[20rem] md:h-[37rem] flex flex-col pt-[2rem] px-4 overflow-y-auto"
              ref={chatContainerRef} // Attach the ref here
            >
              {chatMessages &&
                chatMessages.map((chat, chatIndex) => (
                  <div key={chatIndex}>
                    {chat.messages
                      .sort(
                        (a, b) =>
                          new Date(a.created_at) - new Date(b.created_at)
                      ) // Sort messages by created time
                      .map((message, index) => {
                        const isFromUser =
                          message.from_user === Number(from_user);
                        return (
                          <div
                            className={`flex ${
                              isFromUser
                                ? "justify-end w-[50%]  ml-auto"
                                : "justify-start w-[50%]  mr-auto"
                            } gap-2`}
                            key={index}
                          >
                            <div>
                              {!isFromUser && (
                                <div
                                  className="h-fit flex flex-col gap-2"
                                  onClick={() => {
                                    if (message.type === "image") {
                                      usedispatch(
                                        showModal("ImageModalRightSide")
                                      );
                                    }
                                  }}
                                >
                                  <div className="rightsideboxleftsidechat h-fit p-3 mt-2 rounded-t-xl rounded-br-xl">
                                    {message.type === "image" ? (
                                      <img
                                        src={message.url}
                                        alt="image"
                                        className="w-40 h-40 object-cover rounded-xl cursor-pointer"
                                        onClick={() => {
                                          setRightSideImage(message.url);
                                        }}
                                      />
                                    ) : message.type === "doc" ? (
                                      <a
                                        href={message.url}
                                        download={message.url.split("/").pop()}
                                        className="w-40 h-40 bg-gray-300 flex justify-center items-center rounded-xl"
                                        target="_blank"
                                      >
                                        <Image
                                          src={pdficon}
                                          className=" h-12 w-12  object-cover "
                                          alt="12"
                                        />
                                      </a>
                                    ) : (
                                      <p className="text-black  font-poppins ">
                                        {message.message}
                                      </p>
                                    )}
                                  </div>
                                  <span className="font-poppins text-[#A4A4A4] mt-2">
                                    {message.chat_time}
                                  </span>
                                </div>
                              )}

                              <div className=" hidden">
                                {RightSideImage && (
                                  <ImageModalRightSide
                                    RightSideImage={RightSideImage}
                                  />
                                )}
                              </div>
                            </div>

                            <div>
                              {isFromUser && (
                                <div
                                  className="h-fit flex flex-col gap-2"
                                  onClick={() => {
                                    if (message.type === "image") {
                                      usedispatch(
                                        showModal("ImageModalMessage")
                                      );
                                    }
                                  }}
                                >
                                  <div className="leftsideboxrightsidechat h-fit p-3 rounded-t-xl mt-[1rem] rounded-bl-xl">
                                    {message.type === "image" ? (
                                      <img
                                        src={message.url}
                                        alt="image"
                                        className="w-40 h-40 object-cover rounded-xl cursor-pointer"
                                        onClick={() =>
                                          setSelectedImage(message.url)
                                        }
                                      />
                                    ) : message.type === "doc" ? (
                                      <a
                                        href={message.url}
                                        download={message.url.split("/").pop()}
                                        className="w-40 h-40 bg-gray-300 flex justify-center items-center rounded-xl"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <Image
                                          src={pdficon}
                                          className=" h-12 w-12  object-cover "
                                          alt="12"
                                        />
                                      </a>
                                    ) : (
                                      <p className="text-white font-poppins">
                                        {message.message}
                                      </p>
                                    )}
                                  </div>
                                  <span className="font-poppins text-[#A4A4A4] w-full flex justify-end items-end">
                                    {message.chat_time}
                                  </span>
                                </div>
                              )}

                              {/* Modal for displaying full-size image */}
                              <div className=" hidden">
                                {selectedImage && (
                                  <ImageModalMessage
                                    selectedImage={selectedImage}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ))}
            </div>

            <div className="w-[20rem] h-[12rem] left-7  ">
              {doc && (
                <div className="w-full flex gap-3">
                  <div className="w-full flex items-center cursor-pointer z-30 absolute bottom-[0.1rem] max-w-80 rounded-[9px] gap-2 rounded-bl-none  px-1 pb-3 pt-1 lg:min-w-80">
                    <div className="flex items-center w-full justify-between gap-2 rounded-[7px] p-4 px-6 text-sm bg-[#FAFAFA]">
                      <div className="flex items-center gap-2 z-50">
                        <Image
                          className="h-10 w-10 object-cover"
                          src={pdficon}
                          alt="PDF Icon"
                        />
                        <div className="w-full max-w-56 overflow-hidden">
                          {doc.name}
                        </div>
                      </div>
                      <div
                        className="cursor-pointer w-8 h-8 z-50 rounded-full bg-slate-300"
                        onClick={handleRemoveDoc}
                      >
                        <Image
                          src={crossicon}
                          className="h-8 w-8"
                          alt="crossicon"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {image && (
                <div className=" absolute bottom-[0.1rem] w-[22rem] h-[15rem] p-3 z-30 cursor-pointer">
                  <div
                    className="absolute right-1 top-1 cursor-pointer bg-slate-400 rounded-full"
                    onClick={handleRemoveImage}
                  >
                    <Image
                      src={crossicon}
                      className="h-8 w-8"
                      alt="crossicon"
                    />
                  </div>
                  <div
                    className="w-full h-full z-50 bg-cover bg-center rounded-md"
                    style={{
                      backgroundImage: `url(${URL.createObjectURL(image)})`,
                    }}
                  />
                </div>
              )}
            </div>

            <div className="w-full flex absolute bottom-2 h-[4rem]">
              <div className="flex items-center gap-2 w-full py-4 px-6">
                <div className="flex items-center w-full relative">
                  <div
                    className="absolute left-2 cursor-pointer"
                    onClick={() => setEmojiPickerVisible((prev) => !prev)} // Toggle Emoji Picker
                  >
                    <Image
                      src={emojiicon}
                      className={`h-6 w-6   ${
                        isDarkMode ? "bg-circle-icon " : "text-[#232323]"
                      }`}
                      alt="emoji"
                    />
                  </div>

                  {emojiPickerVisible && (
                    <div className="absolute bottom-12 left-2  ">
                      <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        theme={isDarkMode ? "dark" : "light"}
                      />
                    </div>
                  )}

                  <input
                    type="text"
                    className={`w-full px-4 py-3 text-sm font-poppins pl-10 rounded-md border-2 border-[#B0B0B0] placeholder:text-[#B8B8B8] text-black focus:outline-none  ${
                      isDarkMode ? " bg-[#FFFFFF0A]   text-white" : ""
                    }`}
                    placeholder="Type Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress} // Listen for Enter key
                  />

                  <div
                    className="absolute right-2"
                    onClick={() => {
                      usedispatch(showModal("MessageSendModal"));
                    }}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      className={`my-auto cursor-pointer text-2xl  ${
                        isDarkMode ? "text-white" : "text-[#232323]"
                      }`}
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M355.9 161.1c-8.6 0-15.6 7-15.6 15.6v194.4c0 20.3-8 40.4-22 55.1-13.9 14.6-35.2 23.7-55.5 23.7h-13.6c-19.6 0-39.5-8.9-54.8-24.6-15.2-15.5-23.9-35.6-23.9-55.2V119.3c0-14.9 6.2-28.9 17.3-39.5 11.1-10.5 25.7-16.3 41-16.3 15.1 0 29.3 5.8 39.8 16.2 10.5 10.5 16.4 24.6 16.4 39.6v234.2c0 17.1-13.6 32.2-29 32.2-13.6 0-28.2-12.9-28.2-32.2V219.9c0-8.6-7-15.6-15.6-15.6s-15.6 7-15.6 15.6v133.6c0 35.5 25.5 62.3 59.4 62.3 16.5 0 31.7-6.1 42.7-17.3 11.3-11.4 17.5-27.4 17.5-45V119.3c0-23.4-9.1-45.4-25.7-61.8C274 41 252 32 228.5 32s-45.5 9-62.2 25.5c-16.7 16.5-25.9 38.4-25.9 61.9v250.8c0 28.7 12.2 57.9 32.6 78 20.9 20.6 47.9 31.9 76.1 31.9h13.6c27.6 0 55.3-11.7 75.9-32.1 10.2-10.1 18.2-21.7 23.9-34.6 5.9-13.5 8.9-27.7 8.9-42.1V176.7c.1-8.6-6.9-15.6-15.5-15.6z"></path>
                    </svg>
                  </div>
                </div>

                <button
                  onClick={handleSendMessage}
                  className="w-[60px] flex justify-center items-center h-[51px] rounded-xl bg-[#0046AE] text-white font-medium text-sm"
                  disabled={isLoading} // Disable button when loading
                >
                  {isLoading ? (
                    <div className="w-[30px] h-[30px] border-4 border-t-4 border-[#B8B8B8] rounded-full animate-spin"></div> // Loading spinner
                  ) : (
                    <Image
                      src={sendicon}
                      alt="Send Icon"
                      className="w-[40%] h-[40%]"
                    />
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className=" w-full  h-full flex justify-center items-center">
            <FirstTimeStartChat />
          </div>
        )}
      </>
    </div>
  );
}

export default RightSideBox;

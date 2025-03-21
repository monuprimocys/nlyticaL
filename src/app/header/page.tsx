"use client";
import Image from "next/image";
import logo from "../../../public/assets/Image/logo.png";
import emailicon from "../../../public/assets/Image/emailicon.png";
import callicon from "../../../public/assets/Image/callicon.png";
import instaicon from "../../../public/assets/Image/insta.png";
import fbicon from "../../../public/assets/Image/fb.png";
import languageicon from "../../../public/assets/Image/language.png";
import dropdwonicon from "../../../public/assets/Image/dropdwonicon.png";
import cross from "../../../public/assets/Image/cross.png";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../storeApp/Slice/modalSlice";
import { useAppSelector } from "../hooks/hooks";
import LoginModal from "../(Auth)/loginaccount/page";
import AddPostModal from "../AddPost/page";
import RegisterModal from "../(Auth)/registeraccount/page";
import RegisterModalVerifyOtpModal from "../(Auth)/RegisterModalVerifyOtpModal/page";
import RegisterWithMobailnumberModal from "../(Auth)/RegisterWithMobailnumber/page";
import RegisterWithMobilenumberVerifyOtpModal from "../(Auth)/RegisterWithMobilenumberVerifyOtpModal/RegisterWithMobilenumberVerifyOtpModal";
import ForgotPasswordModal from "../(Auth)/ForgotPasswordModal/ForgotPasswordModal";
import ForgotPasswordOtpVerfiyModal from "../(Auth)/ForgotPasswordOtpVerfiyModal/ForgotPasswordOtpVerfiyModal";
import ResetPasswordModal from "../(Auth)/ResetPasswordModal/ResetPasswordModal";
import Cookies from "js-cookie";
import RightSideAfterLogin from "../header/RightSideAfterLogin";
import DeleteAccountModal from "../componets/modal/DeleteAccountModal";
import AppFeedbackModal from "../componets/modal/AppFeedbackModal";
import AppLanguageModal from "../componets/modal/AppLanguageModal";
import ShareAppModal from "../componets/modal/ShareAppModal";
import LogoutModal from "../componets/modal/LogoutModal";
import ServiceDetailScreenModalImage from "../componets/ServiceDetailScreen/ServiceDetalScreenleftside/LeftSideDetailCompomponets/ServiceDetailScreenModalImage";
import ServiceDetailScreenFiltterModal from "../componets/ServiceDetailScreen/ServiceDetalScreenleftside/LeftSideDetailCompomponets/ServiceDetailScreenFiltterModal";
import ServiceDetailScreenRatingModal from "../componets/ServiceDetailScreen/ServiceDetalScreenleftside/LeftSideDetailCompomponets/ServiceDetailScreenRatingModal";
import ServiceDetailScreenImageSubModal from "../componets/ServiceDetailScreen/ServiceDetalScreenleftside/LeftSideDetailCompomponets/ServiceDetailScreenImageSubModal";
import VisitedModal from "../componets/modal/VisitedModal";
import SelectLocationVisite from "../componets/modal/SelectLocationVisite";
import RegisterWithMobailNumberOtpVerify from "../(Auth)/RegisterWithMobailNumberOtpVerify/RegisterWithMobailNumberOtpVerify";
import { selectAnyModalOpen } from "@/app/storeApp/Slice/modalSlice";
import { useRouter } from "next/navigation";
import MessageSendModal from "../componets/message/MessageBox/MessageSendModal";
import VendorInfoModal from "../componets/message/MessageBox/VendorInfoModal";
import Messagebtn from "../componets/message/messagebtn";
import CampaignModal from "../componets/Mybusiness/SponsorComponets/RightsideSponser/CampaignModal";
import Paymentsuccessful from "../componets/Mybusiness/PaymentComponets/Paymentsuccessful";
import StoresDetailModal from "../componets/ServiceDetailScreen/ServiceDetalScreenleftside/LeftSideDetailCompomponets/StoresDetailModal";
import ServiceDetailScreenFiltterModalDetail from "../componets/ServiceDetailScreen/ServiceDetalScreenleftside/LeftSideDetailCompomponets/ServiceDetailScreenFiltterModalDetail";
import EditReviewModal from "../componets/Profile/Myreview/EditReviewModal";
import DeleteReviewModal from "../componets/Profile/Myreview/DeleteReviewModal";
import SponcerModalAfterAdd from "../componets/Mybusiness/SponsorComponets/RightsideSponser/SponcerModalAfterAdd";
import BusinessNameModal from "../componets/Mybusiness/BusinessTools/ModalBusiness/BusinessNameModal";
import ContactDetailsModal from "../componets/Mybusiness/BusinessTools/ModalBusiness/ContactDetailsModal";
import BusinessAddressToolsModal from "../componets/Mybusiness/BusinessTools/ModalBusiness/BusinessAddressToolsModal";
import BusinessTimingsModal from "../componets/Mybusiness/BusinessTools/ModalBusiness/BusinessTimingsModal";
import YearEstablishmentModal from "../componets/Mybusiness/BusinessTools/ModalBusiness/YearEstablishmentModal";
import BusinesscategoriesModal from "../componets/Mybusiness/BusinessTools/ModalBusiness/BusinesscategoriesModal";
import NumberofEmployeesModal from "../componets/Mybusiness/BusinessTools/ModalBusiness/NumberofEmployeesModal";
import BusinessImagesModal from "../componets/Mybusiness/BusinessTools/ModalBusiness/BusinessImagesModal";
import BusinessWebsiteModal from "../componets/Mybusiness/BusinessTools/ModalBusiness/BusinessWebsiteModal";
import FollowSocialMediaModal from "../componets/Mybusiness/BusinessTools/ModalBusiness/FollowSocialMediaModal";
import AddStoreModal from "../componets/Mybusiness/BusinessService/Service/AddStore/AddStoreModal";
import UpdateAddStoreModal from "../componets/Mybusiness/BusinessService/Service/UpdateStore/UpdateAddStoreModal";
import DeleteStoreModal from "../componets/Mybusiness/BusinessService/Service/UpdateStore/DeleteStoreModal";
import BusinessVideoModal from "../componets/Mybusiness/BusinessTools/ModalBusiness/BusinessVideoModal";
import BusinessPorfileUpdateModal from "../componets/Mybusiness/BusinessQuickLinks/BusinessPorfileUpdateModal";
import BusinessRebiewListModal from "../componets/Mybusiness/BusinessQuickLinks/BusinessRebiewListModal";
import CompleteBusinessModal from "../componets/Mybusiness/BusinessTools/ModalBusiness/CompleteBusinessModal";
import CompleteAddressModal from "../AddPost/BusinessDetail/BusinessDetailForm/CompleteAddressModal";
import ImageModalMessage from "../componets/message/MessageBox/ImageModalMessage";
import ImageModalRightSide from "../componets/message/MessageBox/ImageModalRightSide";
import CheackStoreAdd from "../bussines/CheackStoreAdd";
import Dropdwonlangugae from "../componets/Language/Dropdwonlangugae";
import CheackStoreandPlaneModal from "../bussines/CheackStoreandPlaneModal";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenlanguage, setIsOpenLanguage] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isSticky, setIsSticky] = useState(false);
  const user_id = Cookies.get("loginuser");
  const login_type = Cookies.get("login_token");
  const router = useRouter();
  const myuser_id = Cookies.get("user_id");

  const subscriber_user = Cookies.get("subscriber_user");

  const [isServiceFormSubmit, setPlaneName] = useState(null);

  // Fetch the cookie value on component mount
  useEffect(() => {
    const currentPlaneName = Cookies.get("plane_name") || null;
    setPlaneName(currentPlaneName);
    console.log("Initial plane_name:", currentPlaneName);
  }, []);

  // Listen for updates to the cookie value
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedPlaneName = Cookies.get("is_store") || null;
      if (updatedPlaneName !== isServiceFormSubmit) {
        setPlaneName(updatedPlaneName);
        console.log("Updated plane_name:", updatedPlaneName);
      }
    }, 100); // Check every second

    return () => clearInterval(interval);
  }, [isServiceFormSubmit]);

  console.log(" my scunrrice id ", subscriber_user);

  // MODAL OPEN CLOSE CURRENT

  const dispatch = useDispatch();

  const isLoginModalVisible = useAppSelector(
    (state) => state.modals.loginModal
  );

  const isAddPostModalVisible = useAppSelector(
    (state) => state.modals.AddPostModal
  );

  const isRegisterModalVisible = useAppSelector(
    (state) => state.modals.RegisterModal
  );

  const isRegisterModalVerifyOtpModalVisibile = useAppSelector(
    (state) => state.modals.RegisterModalVerifyOtpModal
  );

  const isRegisterWithMobilenumberModalVisibile = useAppSelector(
    (state) => state.modals.RegisterWithMobilenumber
  );

  const isRegisterWithMobilenumberVerifyOtpModalVisibile = useAppSelector(
    (state) => state.modals.RegisterWithMobilenumberVerifyOtpModal
  );

  const isForgotPasswordModalVisibile = useAppSelector(
    (state) => state.modals.ForgotPasswordModal
  );

  const isForgotPasswordOtpVerfiyModalVisibile = useAppSelector(
    (state) => state.modals.ForgotPasswordOtpVerfiyModal
  );

  const isResetPasswordModalVisibile = useAppSelector(
    (state) => state.modals.ResetPasswordModal
  );

  const isDeleteAccountVisibile = useAppSelector(
    (state) => state.modals.DeleteAccount
  );

  const isAppFeedbackVisibile = useAppSelector(
    (state) => state.modals.AppFeedback
  );

  const isAppLanguageModalVisibile = useAppSelector(
    (state) => state.modals.AppLanguage
  );

  const isShareAppModalVisibile = useAppSelector(
    (state) => state.modals.ShareAppModal
  );

  const isLogoutModalVisibile = useAppSelector(
    (state) => state.modals.LogoutModal
  );

  const isCompleteAddressModalVisibile = useAppSelector(
    (state) => state.modals.CompleteAddressModal
  );

  const isServiceDetailScreenModalImageVisible = useAppSelector(
    (state) => state.modals.ServiceDetailScreenModalImage
  );

  const isServiceDetailScreenFiltterModalVisibile = useAppSelector(
    (state) => state.modals.ServiceDetailScreenFiltterModal
  );

  const isServiceDetailScreenRatingModalVisibile = useAppSelector(
    (state) => state.modals.ServiceDetailScreenRatingModal
  );

  const isServiceDetailScreenImageSubModalVisibile = useAppSelector(
    (state) => state.modals.ServiceDetailScreenImageSubModal
  );

  const isBusinessNameModalVisibile = useAppSelector(
    (state) => state.modals.BusinessNameModal
  );

  const isContactDetailsModalVisibile = useAppSelector(
    (state) => state.modals.ContactDetailsModal
  );

  const isBusinessAddressToolsModalVisibile = useAppSelector(
    (state) => state.modals.BusinessAddressToolsModal
  );

  const isBusinessTimingsModalVisibile = useAppSelector(
    (state) => state.modals.BusinessTimingsModal
  );

  const isYearEstablishmentModalVisibile = useAppSelector(
    (state) => state.modals.YearEstablishmentModal
  );

  const isBusinesscategoriesModalVisibile = useAppSelector(
    (state) => state.modals.BusinesscategoriesModal
  );

  const isNumberofEmployeesModalVisibile = useAppSelector(
    (state) => state.modals.NumberofEmployeesModal
  );

  const isBusinessImagesModalVisibile = useAppSelector(
    (state) => state.modals.BusinessImagesModal
  );

  const isBusinessWebsiteModalVisibile = useAppSelector(
    (state) => state.modals.BusinessWebsiteModal
  );

  const isFollowSocialMediaModalVisibile = useAppSelector(
    (state) => state.modals.FollowSocialMediaModal
  );

  const isAddStoreModalVisibile = useAppSelector(
    (state) => state.modals.AddStoreModal
  );

  const isUpdateAddStoreModalVisibile = useAppSelector(
    (state) => state.modals.UpdateAddStoreModal
  );

  const isDeleteStoreModalVisibile = useAppSelector(
    (state) => state.modals.DeleteStoreModal
  );

  const isVisitedModalVisibile = useAppSelector(
    (state) => state.modals.VisitedModal
  );

  const isSelectLocationVisiteVisibile = useAppSelector(
    (state) => state.modals.SelectLocationVisite
  );

  const isRegisterWithMobailNumberOtpVerifyVisibile = useAppSelector(
    (state) => state.modals.RegisterWithMobailNumberOtpVerify
  );

  const isBusinessVideoModalVisible = useAppSelector(
    (state) => state.modals.BusinessVideoModal
  );

  const isBusinessPorfileUpdateModal = useAppSelector(
    (state) => state.modals.BusinessPorfileUpdateModal
  );

  const isBusinessRebiewListModalVisible = useAppSelector(
    (state) => state.modals.BusinessRebiewListModal
  );

  const isCompleteBusinessModalVisible = useAppSelector(
    (state) => state.modals.CompleteBusinessModal
  );

  const isMessageSendModalVisible = useAppSelector(
    (state) => state.modals.MessageSendModal
  );

  const isVendorInfoModalVisible = useAppSelector(
    (state) => state.modals.VendorInfoModal
  );

  const isCampaignModalVisible = useAppSelector(
    (state) => state.modals.CampaignModal
  );

  const isPaymentsuccessfulVisile = useAppSelector(
    (state) => state.modals.Paymentsuccessful
  );

  const isStoresDetailModalVisibility = useAppSelector(
    (state) => state.modals.StoresDetailModal
  );

  const isServiceDetailScreenFiltterModalDetailVisibility = useAppSelector(
    (state) => state.modals.ServiceDetailScreenFiltterModalDetail
  );

  const isDeleteReviewModalVisibility = useAppSelector(
    (state) => state.modals.DeleteReviewModal
  );

  const isEditReviewModalVisibility = useAppSelector(
    (state) => state.modals.EditReviewModal
  );

  const isSponcerModalAfterAddVisibility = useAppSelector(
    (state) => state.modals.SponcerModalAfterAdd
  );

  const isImageModalMessageVisibility = useAppSelector(
    (state) => state.modals.ImageModalMessage
  );

  const isImageModalRightSideVisibility = useAppSelector(
    (state) => state.modals.ImageModalRightSide
  );

  const isCheackStoreAddVisibility = useAppSelector(
    (state) => state.modals.CheackStoreAdd
  );

  const isCheackStoreandPlaneModalVisibility = useAppSelector(
    (state) => state.modals.CheackStoreandPlaneModal
  );

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Toggle dropdown visibility on click
  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  // Toggle language dropdown visibility on click
  const toggleLanguageDropdown = () => {
    setIsOpenLanguage((prevState) => !prevState);
  };

  interface LanguageSelectionProps {
    language: string;
  }

  const handleLanguageSelection = ({
    language,
  }: LanguageSelectionProps): void => {
    setSelectedLanguage(language); // Update the selected language
    setIsOpenLanguage(false); // Close the dropdown after selection
  };

  // Handle scroll event to toggle sticky state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsSticky(true); // Sticky state when scrolled beyond 10px
      } else {
        setIsSticky(false); // Reset state when scrolled back to the top
      }
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isAnyModalOpen = useSelector(selectAnyModalOpen);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const handalmessage = () => {
    router.push("/message");
  };

  // const handalCheakStore = () => {
  //   router.push("/sub");
  // };

  return (
    <header
      className={`w-full  ${isSticky ? "header-area bg-black" : ""} ${
        isAnyModalOpen ? " z-10" : "z-50"
      }`}
    >
      <div
        className={`hidden h-auto w-full  xl:block  ${
          isDarkMode ? "text-white  bg-[#0145AC]" : "  bg-[#202020] "
        }`}
      >
        {/* Header Top Section */}
        <div className="mx-auto flex w-[90%] items-center justify-between py-2 2xl:w-[80%]">
          {/* Left side part */}
          <div className="flex w-fit items-center justify-between gap-8">
            <div className="flex cursor-pointer items-center gap-2">
              {/* Email Icon */}
              <div className="h-5 w-5">
                <Image
                  src={emailicon}
                  alt="Email Icon"
                  width={20}
                  height={20}
                />
              </div>
              <div>
                <a
                  href="mailto:info.nlytical@gmail.com"
                  className="font-poppins text-sm font-[400] text-white"
                >
                  info.nlytical@gmail.com
                </a>
              </div>
            </div>
            <div className="flex cursor-pointer items-center gap-2">
              {/* Phone Icon */}
              <div className="h-5 w-5">
                <Image src={callicon} alt="Call Icon" width={20} height={20} />
              </div>
              <div>
                <a
                  href="tel:+355695509143"
                  className="font-poppins text-sm font-[400] text-white"
                >
                  +355 69 550 9143
                </a>
              </div>
            </div>
          </div>

          {/* Right side part */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="cursor-pointer">
                <p className="font-poppins text-sm font-[400] text-white">
                  Follow Us
                </p>
              </div>

              <div className="flex h-5 w-5 cursor-pointer items-center justify-center">
                <a href="https://www.instagram.com/primocys/" target="_blank">
                  <Image
                    src={instaicon}
                    alt="Instagram Icon"
                    width={20}
                    height={20}
                  />
                </a>
              </div>

              <div className="h-5 w-5 cursor-pointer">
                <a href="https://www.facebook.com/primocys" target="_blank">
                  <Image
                    src={fbicon}
                    alt="Facebook Icon"
                    width={20}
                    height={20}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section Header */}
      <div
        className={`z-50 w-full  shadow-lg  ${
          isDarkMode ? "bg-[#222222]" : "bg-white"
        }`}
      >
        <div className="mx-auto flex h-[4rem] w-[95%] items-center justify-between xl:h-[5rem] 2xl:w-[80%]">
          {/* Logo */}
          <div className=" ">
            <div className="flex h-[2rem] w-full cursor-pointer justify-center xl:h-auto xl:w-[7rem] 2xl:w-[9rem]">
              <Link href={"/"}>
                <Image
                  src={logo}
                  alt="Logo"
                  width={200}
                  height={72}
                  className={`h-full w-full object-cover    ${
                    isDarkMode ? " bg-circle-icon" : ""
                  } `}
                />
              </Link>
            </div>
          </div>

          {/* Center content (Desktop view) */}
          <div className="flex hidden h-full items-center justify-center xl:flex">
            <ul className="flex w-full cursor-pointer items-center justify-center gap-3 text-sm font-[500] text-black sm:text-base">
              <li className="group relative cursor-pointer p-2 sm:p-3">
                <Link
                  href="/"
                  passHref
                  className={`font-poppins relative z-10 font-normal   ${
                    isDarkMode ? "text-[#FFFFFFCC]" : "text-black"
                  } `}
                >
                  Home
                </Link>
                <div className="absolute bottom-1 left-0 right-0">
                  <div className="h-[2px] scale-x-0 rounded-full bg-white transition-all duration-300 group-hover:scale-x-100"></div>
                </div>
              </li>
              <li className="group relative cursor-pointer p-2 sm:p-3">
                <Link
                  href="/store"
                  passHref
                  className={`font-poppins relative z-10 font-normal   ${
                    isDarkMode ? "text-[#FFFFFFCC]" : "text-black"
                  } `}
                >
                  Stores
                </Link>
                <div className="absolute bottom-1 left-0 right-0">
                  <div className="h-[2px] scale-x-0 rounded-full bg-white transition-all duration-300 group-hover:scale-x-100"></div>
                </div>
              </li>

              <li className="group relative cursor-pointer p-2 sm:p-3">
                <Link
                  href="/about"
                  passHref
                  className={`font-poppins relative z-10 font-normal   ${
                    isDarkMode ? "text-[#FFFFFFCC]" : "text-black"
                  } `}
                >
                  About
                </Link>
                <div className="absolute bottom-1 left-0 right-0">
                  <div className="h-[2px] scale-x-0 rounded-full bg-white transition-all duration-300 group-hover:scale-x-100"></div>
                </div>
              </li>
              <li className="group relative cursor-pointer p-2 sm:p-3">
                <Link
                  href="/Subscribe"
                  passHref
                  className={`font-poppins relative z-10 font-normal   ${
                    isDarkMode ? "text-[#FFFFFFCC]" : "text-black"
                  } `}
                >
                  Subscribe
                </Link>
                <div className="absolute bottom-1 left-0 right-0">
                  <div className="h-[2px] scale-x-0 rounded-full bg-white transition-all duration-300 group-hover:scale-x-100"></div>
                </div>
              </li>
              <li className="group relative cursor-pointer p-2 sm:p-3">
                <Link
                  href="/contactus"
                  passHref
                  className={`font-poppins relative z-10 font-normal   ${
                    isDarkMode ? "text-[#FFFFFFCC]" : "text-black"
                  } `}
                >
                  Contact Us
                </Link>
                <div className="absolute bottom-1 left-0 right-0">
                  <div className="h-[2px] scale-x-0 rounded-full bg-white transition-all duration-300 group-hover:scale-x-100"></div>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-between  gap-2   ">
            {/* Profile btn (Right side) */}
            <div className="flex items-center justify-end gap-2 md:pr-3 xl:pr-0">
              {/* Dropdown for language */}
              <div className="mx-auto flex w-fit max-w-sm items-end justify-end   hidden md:block">
                <div className="flex items-center justify-between">
                  <Dropdwonlangugae />
                </div>
              </div>

              {/* Buttons for 'Post Your Ad' and 'Sign In' */}
              <div className="flex items-center justify-center gap-6">
                {/*  if user id not exit then show login modal  */}
                <div
                  onClick={() => {
                    if (myuser_id) {
                      handalmessage();
                    } else {
                      dispatch(showModal("loginModal"));
                    }
                  }}
                >
                  <Messagebtn />
                </div>
                {isServiceFormSubmit !== "1" && (
                  <div
                    className="flex hidden cursor-pointer items-center justify-center rounded-lg border-2 bg-[#0046AE] border-[#0046AE] px-6 py-2  md:block"
                    onClick={() => {
                      if (user_id && subscriber_user === "1") {
                        dispatch(showModal("AddPostModal"));
                      } else {
                        router.push("/Subscribe");
                      }
                    }}
                  >
                    <button className="font-poppins font-[500] text-white  ">
                      Add Store
                    </button>
                  </div>
                )}

                {/* Conditional rendering based on user_id */}
                {user_id || login_type ? (
                  <RightSideAfterLogin /> // This will be shown if user_id exists
                ) : (
                  <div
                    className="flex hidden cursor-pointer items-center justify-center rounded-lg border-2 border-[#0046AE] px-6 py-2 hover:bg-slate-200 xl:block"
                    onClick={() => {
                      if (!user_id || !login_type) {
                        dispatch(showModal("loginModal"));
                      }
                    }}
                  >
                    <button className="font-poppins font-[500] text-[#0046AE]">
                      Sign In
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu and profile (Mobile view) */}
            <div className="flex w-fit items-end justify-end gap-4 py-4 xl:hidden">
              {/* Hamburger menu icon */}
              <div
                className="flex cursor-pointer items-center justify-center text-2xl"
                onClick={handleMenuToggle}
              >
                ☰
              </div>
            </div>
          </div>

          {/* Full-screen sliding menu (Mobile view) */}
          <div
            className={`fixed right-0 top-0 z-50 flex h-full w-full transform justify-end bg-black bg-opacity-80 transition-all duration-500 xl:hidden ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div
              className={`flex h-auto w-full flex-col bg-white p-4 transition-all duration-500 ${
                isMenuOpen ? "h-screen" : "h-full"
              }`}
            >
              <div className="flex w-full items-start justify-between">
                <div className=" ">
                  <div className="flex h-[2rem] w-full cursor-pointer justify-center xl:h-auto xl:w-[7rem] 2xl:w-[9rem]">
                    <Link href={"/"}>
                      <Image
                        src={logo}
                        alt="Logo"
                        width={200}
                        height={72}
                        className="h-full w-full object-cover"
                      />
                    </Link>
                  </div>
                </div>
                <button
                  className="flex h-12 w-12 items-start font-semibold text-black"
                  onClick={handleMenuToggle}
                >
                  <Image src={cross} alt="Close Icon" className="h-8 w-8" />
                </button>
              </div>

              {/* Navigation Links */}
              <ul className="font-poppins text-sm text-black">
                <li className="py-4 font-normal">
                  <Link href="/" onClick={handleCloseMenu}>
                    Home
                  </Link>
                </li>
                <hr />
                <li className="py-4 font-normal">
                  <Link href="/store" onClick={handleCloseMenu}>
                    Stores
                  </Link>
                </li>
                <hr />

                {isMenuOpen && (
                  <div className="pointer-events-auto  translate-y-0 opacity-100 transition-all duration-300 ease-out">
                    <li className="py-4 font-normal">
                      <Link href="/about" onClick={handleCloseMenu}>
                        About
                      </Link>
                    </li>
                    <hr />
                    <li className="py-4 font-normal">
                      <Link href="/Subscribe" onClick={handleCloseMenu}>
                        Subscribe
                      </Link>
                    </li>
                    <hr />
                    <li className="py-4 font-normal">
                      <Link href="/contactus" onClick={handleCloseMenu}>
                        Contact Us
                      </Link>
                    </li>
                    <hr />
                  </div>
                )}
              </ul>

              <div className="mt-4 flex w-full items-center justify-between">
                {isServiceFormSubmit !== "1" && (
                  <div
                    className="flex cursor-pointer items-center justify-center rounded-lg  bg-[#0046AE] border-2 border-[#0046AE] px-2 py-2 small:px-[5px] xl:hidden"
                    onClick={() => {
                      if (user_id) {
                        dispatch(showModal("AddPostModal"));
                      } else {
                        dispatch(showModal("loginModal"));
                      }
                    }}
                  >
                    <button className="font-poppins text-xs font-[500] text-[#FFFFFF]">
                      Add Store
                    </button>
                  </div>
                )}
                {!user_id && (
                  <div
                    className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-[#0046AE] px-3 py-2 hover:bg-slate-200 small:px-[9px] xl:hidden"
                    onClick={() => {
                      dispatch(showModal("loginModal"));
                      setIsMenuOpen(false);
                    }}
                  >
                    <button className="font-poppins text-xs font-[500] text-[#0046AE]">
                      Sign In
                    </button>
                  </div>
                )}

                <div className="flex items-start justify-start">
                  {/* Language Icon Button */}
                  <button
                    id="states-button"
                    data-dropdown-toggle="dropdown-states"
                    className="z-10 inline-flex flex-shrink-0 items-center py-2.5 text-center text-sm font-medium text-black"
                    type="button"
                  >
                    <div className="h-6 w-6 mt-[-0.2rem] text-black">
                      <Image
                        src={languageicon}
                        alt="Language Icon"
                        width={24}
                        height={24}
                      />
                    </div>
                  </button>

                  {/* Language Selector */}
                  <div className="group relative cursor-pointer p-2 sm:p-3">
                    <div className="flex items-center justify-center gap-2">
                      <p className="font-poppins relative z-10 text-sm text-black">
                        {selectedLanguage}
                      </p>
                      <div className="h-5 w-5" onClick={toggleLanguageDropdown}>
                        <Image
                          src={dropdwonicon}
                          alt="Dropdown Icon"
                          width={20}
                          height={20}
                          className={`transform ${
                            isOpenlanguage ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>

                    {/* Dropdown menu */}
                    {isOpenlanguage && (
                      <div
                        className={`absolute left-[-4rem] top-14 z-50 flex w-[10rem] -translate-y-2 transform items-center justify-center rounded border bg-white opacity-0 shadow transition-all duration-300 ease-out ${
                          isOpenlanguage
                            ? "pointer-events-auto translate-y-0 opacity-100"
                            : "pointer-events-none"
                        }`}
                      >
                        <ul className="w-full">
                          <li
                            className="flex cursor-pointer items-center gap-3 p-3 text-sm font-normal"
                            onClick={() =>
                              handleLanguageSelection({ language: "English" })
                            }
                          >
                            <p className="font-poppins font-normal">English</p>
                          </li>
                          <hr />
                          <li
                            className="flex cursor-pointer items-center gap-3 p-3 text-sm"
                            onClick={() =>
                              handleLanguageSelection({ language: "Hindi" })
                            }
                          >
                            <p className="font-poppins font-normal">Hindi</p>
                          </li>
                          <hr />
                          <li
                            className="flex cursor-pointer items-center gap-3 p-3 text-sm"
                            onClick={() =>
                              handleLanguageSelection({ language: "Gujarati" })
                            }
                          >
                            <p className="font-normalfont-poppins">Gujarati</p>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoginModalVisible && <LoginModal />}
      {isAddPostModalVisible && <AddPostModal />}
      {isRegisterModalVisible && <RegisterModal />}
      {isRegisterModalVerifyOtpModalVisibile && <RegisterModalVerifyOtpModal />}
      {isRegisterWithMobilenumberModalVisibile && (
        <RegisterWithMobailnumberModal />
      )}
      {isRegisterWithMobilenumberVerifyOtpModalVisibile && (
        <RegisterWithMobilenumberVerifyOtpModal />
      )}

      {isForgotPasswordModalVisibile && <ForgotPasswordModal />}
      {isForgotPasswordOtpVerfiyModalVisibile && (
        <ForgotPasswordOtpVerfiyModal />
      )}
      {isResetPasswordModalVisibile && <ResetPasswordModal />}
      {isDeleteAccountVisibile && <DeleteAccountModal />}

      {isAppFeedbackVisibile && <AppFeedbackModal />}
      {isAppLanguageModalVisibile && <AppLanguageModal />}
      {isShareAppModalVisibile && <ShareAppModal />}
      {isLogoutModalVisibile && <LogoutModal />}
      {isCompleteAddressModalVisibile && <CompleteAddressModal />}
      {isServiceDetailScreenModalImageVisible && (
        <ServiceDetailScreenModalImage />
      )}
      {isServiceDetailScreenFiltterModalVisibile && (
        <ServiceDetailScreenFiltterModal />
      )}

      {isServiceDetailScreenRatingModalVisibile && (
        <ServiceDetailScreenRatingModal />
      )}

      {isServiceDetailScreenImageSubModalVisibile && (
        <ServiceDetailScreenImageSubModal />
      )}

      {isBusinessNameModalVisibile && <BusinessNameModal />}

      {isContactDetailsModalVisibile && <ContactDetailsModal />}
      {isBusinessAddressToolsModalVisibile && <BusinessAddressToolsModal />}
      {isBusinessTimingsModalVisibile && <BusinessTimingsModal />}
      {isYearEstablishmentModalVisibile && <YearEstablishmentModal />}
      {isBusinesscategoriesModalVisibile && <BusinesscategoriesModal />}
      {isNumberofEmployeesModalVisibile && <NumberofEmployeesModal />}
      {isBusinessImagesModalVisibile && <BusinessImagesModal />}
      {isBusinessWebsiteModalVisibile && <BusinessWebsiteModal />}
      {isFollowSocialMediaModalVisibile && <FollowSocialMediaModal />}
      {isAddStoreModalVisibile && <AddStoreModal />}
      {isUpdateAddStoreModalVisibile && <UpdateAddStoreModal />}
      {isDeleteStoreModalVisibile && <DeleteStoreModal />}
      {/* {isVisitedModalVisibile && <VisitedModal />} */}

      {/* {isSelectLocationVisiteVisibile && <SelectLocationVisite/>} */}
      {isRegisterWithMobailNumberOtpVerifyVisibile && (
        <RegisterWithMobailNumberOtpVerify />
      )}
      {isBusinessVideoModalVisible && <BusinessVideoModal />}
      {isBusinessPorfileUpdateModal && <BusinessPorfileUpdateModal />}
      {isBusinessRebiewListModalVisible && <BusinessRebiewListModal />}
      {isCompleteBusinessModalVisible && <CompleteBusinessModal />}
      {isMessageSendModalVisible && <MessageSendModal />}
      {isVendorInfoModalVisible && <VendorInfoModal />}
      {isCampaignModalVisible && <CampaignModal />}
      {isPaymentsuccessfulVisile && <Paymentsuccessful />}
      {isStoresDetailModalVisibility && <StoresDetailModal />}
      {isServiceDetailScreenFiltterModalDetailVisibility && (
        <ServiceDetailScreenFiltterModalDetail />
      )}

      {isEditReviewModalVisibility && <EditReviewModal />}
      {isDeleteReviewModalVisibility && <DeleteReviewModal />}
      {isSponcerModalAfterAddVisibility && <SponcerModalAfterAdd />}
      {isImageModalMessageVisibility && <ImageModalMessage />}
      {isImageModalRightSideVisibility && <ImageModalRightSide />}
      {isCheackStoreAddVisibility && <CheackStoreAdd />}
      {isCheackStoreandPlaneModalVisibility && <CheackStoreandPlaneModal />}
    </header>
  );
}

export default Header;

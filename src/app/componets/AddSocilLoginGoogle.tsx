"use client";
import googlelogo from "../../../public/assets/Image/googlelogo.png";
import Image from "next/image";
import { useGoogleLogin } from "@react-oauth/google";
import { useAddSocialloginMutation } from "../storeApp/api/AddSociallogin";
import { useDispatch } from "react-redux";
import { hideModal, showModal } from "../storeApp/Slice/modalSlice";
import Cookies from "js-cookie";
import { setUserId, setUserInfo } from "../storeApp/Slice/userSlicegoogle ";
import { useAppSelector } from "../hooks/hooks";
import { useUpdateProfileMutation } from "../storeApp/api/auth/ProfileUpdate";
import { useServiceDetailApi } from "../storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";

function AddSocilLoginGoogle() {
  const id = sessionStorage.getItem("serviceId");

  const { refetch } = useServiceDetailApi(id);
  const [addSociallogin] = useAddSocialloginMutation();
  const [triggerUpdateProfile, { data, isLoading }] =
    useUpdateProfileMutation();
  const dispatch = useDispatch();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Fetch Google user info
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        const userInfo = await userInfoResponse.json();
        dispatch(setUserInfo(userInfo));
        refetch();
        // Social login API call
        const response = await addSociallogin({
          login_type: "google",
          email: userInfo?.email,
        }).unwrap();
        dispatch(hideModal("loginModal")); // Hide modal after successful login and profile update
        refetch();
        // Store user ID in cookies
        Cookies.set("user_id", response.user.id);
        Cookies.set("loginuser", "user_login");

        // Fetch user_id again after setting the cookie
        const user_id = Cookies.get("user_id");

        // If user_id exists, update profile
        if (user_id) {
          const profileData = {
            email: userInfo?.email,
            first_name: userInfo?.name,
            image: userInfo?.picture,
            user_id: user_id,
          };

          try {
            const updateResponse = await triggerUpdateProfile(
              profileData
            ).unwrap();
            console.log("Profile updated successfully:", updateResponse);
            dispatch(setUserInfo(updateResponse.user)); // Update Redux store instead of reload
            refetch(); // Fetch updated service details after profile update
          } catch (error) {
            console.error("Error updating profile:", error);
            if (error?.data) {
            }
          }
        }
      } catch (error) {
        console.error("Error during social login:", error);
      }
    },
  });

  const userfdetail = useAppSelector((state) => state.user);

  console.log("userfdetail@@@@@@", userfdetail.userInfo);

  return (
    <div
      className="flex w-full cursor-pointer items-center justify-center gap-6 rounded-lg border border-[#0046AE] py-3"
      onClick={() => googleLogin()} // Trigger Google login on click
    >
      <div className="h-6 w-6">
        <Image
          src={googlelogo}
          alt="Google Logo"
          className="h-full w-full object-contain"
        />
      </div>
      <p className="font-poppins text-sm font-medium text-[#3A3333]">
        Continue with Google
      </p>
    </div>
  );
}

export default AddSocilLoginGoogle;

import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/store/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import "./style.css";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

function LogoutModal() {
  const modalData = useAppSelector((state) => state.modals.LogoutModal);

  const dispatch = useAppDispatch();

  const close = () => {
    dispatch(hideModal("LogoutModal"));
  };

  const handalLogout = () => {
    // Add your logout logic here
    toast.success("Logged out successfully!");
    Cookies.remove("user_id");
    dispatch(hideModal("LogoutModal"));
    window.location.href = "/";
  };

  return (
    <Dialog open={modalData} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel className="mx-auto h-[15rem] w-[90%] rounded-2xl bg-white shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%]  xl:w-[30%] 2xl:w-[25%]">
            {/* Top Heading */}
            <div className="deleteac flex w-full items-center justify-center rounded-xl p-4">
              <h3 className="font-poppins text-lg font-medium text-black">
                Logout
              </h3>
            </div>

            {/* Content */}
            <div className="h-auto w-full">
              <p className="font-poppins mx-auto w-[70%] items-center p-5 text-lg text-[#000000]">
                Are you sure you want to Logout ?
              </p>
            </div>

            {/* Cancel and Delete Buttons */}
            <div className="mx-auto flex h-auto w-[80%] items-center justify-between gap-6">
              {/* Cancel Button */}
              <button
                onClick={close} // Close the modal on cancel
                className="font-poppins cancelbordercolor w-full rounded-md py-2 text-[#3A3333]"
              >
                Cancel
              </button>

              {/* Delete Button */}
              <button
                className="font-poppins w-full rounded-md bg-[#0046AE] py-2 text-white"
                onClick={handalLogout}
              >
                Logout
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default LogoutModal;

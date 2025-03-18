import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { useDeleteUserReview } from "@/app/storeApp/api/useDeleteUserReview";
import { useGetReview } from "@/app/storeApp/api/useGetReview";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Cookies from "js-cookie";

function DeleteReviewModal() {
  const modalOpen = useAppSelector((state) => state.modals.DeleteReviewModal);
  const dispatch = useAppDispatch();

  const { mutate: deleteReview, isLoading, isError } = useDeleteUserReview();
  const { data, refetch } = useGetReview();

  console.log(" my  review   detail ", data);

  const id = Cookies.get("reviewid");
  // Close modal
  const close = () => dispatch(hideModal("DeleteReviewModal"));

  // Handle delete click
  const handleDeleteClick = async () => {
    try {
      await deleteReview(id); // Call delete function with reviewId
      refetch();
      close(); // Close modal after successful delete
    } catch (error) {
      console.error("Error deleting review", error);
    }
  };

  return (
    <Dialog open={modalOpen} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full h-auto items-center justify-center">
          <DialogPanel className="mx-auto h-[15rem] w-[90%] rounded-2xl bg-white shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] md:w-[45%] lg:w-[25%]">
            {/* Top Heading */}
            <div className="deleteac flex w-full items-center justify-center rounded-xl p-4">
              <h3 className="font-poppins text-lg font-medium text-black">
                Delete Review
              </h3>
            </div>

            {/* Content */}
            <div className="h-auto w-full">
              <p className="font-poppins mx-auto w-[70%] items-center p-5 text-lg text-[#000000]">
                Are you sure you want to delete your Review?
              </p>
            </div>

            {/* Cancel and Delete Buttons */}
            <div className="mx-auto flex h-auto w-[80%] items-center justify-between gap-6">
              {/* Delete Button */}
              <button
                onClick={handleDeleteClick} // Call delete function when clicked
                disabled={isLoading}
                className="font-poppins w-full rounded-md bg-[#0046AE] py-3 text-white"
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
              {/* Cancel Button */}
              <button
                onClick={close} // Close the modal on cancel (no API call here)
                className="font-poppins cancelbordercolor w-full rounded-md py-3 text-[#3A3333]"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default DeleteReviewModal;

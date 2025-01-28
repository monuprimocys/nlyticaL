import Image from "next/image";
import React from "react";
import crossicon from "../../../public/assets/Image/crossicon.png";
import { hideModal } from "../store/Slice/modalSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

function ModalLable() {
  const dispatch = useAppDispatch();

  function close() {
    dispatch(hideModal("AddPostModal"));
  }

  const AddPostDataStep = useAppSelector(
    (state) => state.AddPost.add_new_post_steps,
  );

  // Set title based on the current step
  const getModalTitle = () => {
    switch (AddPostDataStep) {
      case 1:
        return "Business Detail";
      case 2:
        return "Contact Details";
      case 3:
        return "Business Time";
      default:
        return "Business Detail";
    }
  };

  return (
    <div>
      <h4 className="font-poppins text-xl font-medium text-black">
        {getModalTitle()}
      </h4>
      {/* Right side cross icon */}
      <div className="absolute right-4 top-6 cursor-pointer" onClick={close}>
        <Image src={crossicon} className="h-8 w-8" alt="crossicon" />
      </div>
    </div>
  );
}

export default ModalLable;

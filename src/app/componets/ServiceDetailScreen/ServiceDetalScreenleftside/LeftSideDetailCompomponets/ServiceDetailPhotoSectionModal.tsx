import { useAppSelector } from "@/app/hooks/hooks";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";

// TypeScript interface for props
interface ServiceDetailPhotoSectionModalProps {
  selectedImage: string | null;
  setSelectedImage: Dispatch<SetStateAction<string | null>>;
}

const ServiceDetailPhotoSectionModal: React.FC<
  ServiceDetailPhotoSectionModalProps
> = ({ selectedImage, setSelectedImage }) => {
  const ServiceDetailData = useAppSelector((state) => state.serviceDetail);
  const serviceImages = ServiceDetailData.serviceDetail.service_images || [];
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  // Function to close the modal
  const close = () => {
    setSelectedImage(null); // Close the modal by setting selectedImage to null
  };

  // Function to go to the previous image
  const prevImage = () => {
    if (!selectedImage) return;
    const currentIndex = serviceImages.indexOf(selectedImage);
    const prevIndex =
      (currentIndex - 1 + serviceImages.length) % serviceImages.length;
    setSelectedImage(serviceImages[prevIndex]);
  };

  // Function to go to the next image
  const nextImage = () => {
    if (!selectedImage) return;
    const currentIndex = serviceImages.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % serviceImages.length;
    setSelectedImage(serviceImages[nextIndex]);
  };

  if (!selectedImage) return null; // Don't render the modal if no image is selected

  return (
    <Dialog
      open={true}
      onClose={close}
      className="relative z-10 focus:outline-none"
    >
      {/* Backdrop with blur effect */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10" />

      {/* Modal content */}
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <DialogPanel className={`mx-auto w-[90%] md:w-[50%]  bg-white rounded-xl relative  ${
          isDarkMode? "dark:bg-gray-800 dark:text-white" : ""
        }`}>
          {/* Close icon */}
          <button
            className="absolute top-1 right-1 bg-gray-300 rounded-full p-2 text-2xl text-[#0046AE]"
            onClick={close}
            aria-label="Close"
          >
            <IoClose />
          </button>

          {/* Left Arrow */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-full p-2 text-2xl text-[#0046AE]"
            aria-label="Previous Image"
          >
            <IoChevronBack />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-full p-2 text-2xl text-[#0046AE]"
            aria-label="Next Image"
          >
            <IoChevronForward />
          </button>

          {/* Image display */}
          <div
            className="w-full"
            style={{
              backgroundImage: `url(${selectedImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "30rem",
              borderRadius: "1rem",
            }}
          ></div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ServiceDetailPhotoSectionModal;

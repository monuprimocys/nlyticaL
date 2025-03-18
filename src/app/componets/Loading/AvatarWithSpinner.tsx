// components/AvatarWithSpinner.js
import Image from "next/image";

const AvatarWithSpinner = () => {
  return (
    <div className="relative flex w-full items-center justify-center">
      <div className="absolute h-32 w-32 animate-spin rounded-full border-b-4 border-t-4 border-purple-500"></div>
      <Image
        src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
        alt="Avatar"
        className="h-28 w-28 rounded-full"
        width={112} // equivalent to h-28 and w-28 (Tailwind's 7rem)
        height={112} // equivalent to h-28 and w-28 (Tailwind's 7rem)
      />
    </div>
  );
};

export default AvatarWithSpinner;

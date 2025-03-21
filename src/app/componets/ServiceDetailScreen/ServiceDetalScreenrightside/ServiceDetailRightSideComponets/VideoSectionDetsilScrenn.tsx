import { useAppSelector } from "@/app/hooks/hooks";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import playvideobtn from "../../../../../../public/assets/Image/play-button-arrowhead 1.png";
import { decodeString } from "@/app/utils/enocodeAndDecode";
import { usePathname } from "next/navigation";

function VideoSectionDetailScreen() {
  const pathname = usePathname();
  const lastSegment1 = pathname.split("/").filter(Boolean).pop() || "";
  const lastSegment = decodeString(lastSegment1);
  const { data } = useServiceDetailApi(lastSegment);

  const [videoUrl, setVideoUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (data?.serviceDetail?.video_url) {
      setVideoUrl(data.serviceDetail.video_url);
    } else if (data?.serviceDetail?.video) {
      setVideoUrl(data.serviceDetail.video);
    }
  }, [data]);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const getEmbeddedUrl = (url) => {
    if (url.includes("youtu.be")) {
      return url.replace("youtu.be/", "https://www.youtube.com/embed/");
    } else if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    return url;
  };

  const getYouTubeThumbnail = (url) => {
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("v=")[1].split("&")[0];
    }
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  const isYouTubeVideo =
    videoUrl.includes("youtu.be") || videoUrl.includes("youtube.com");

  const handlePlayVideo = () => {
    if (isYouTubeVideo) {
      setIsPlaying(true);
    } else if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  if (!videoUrl) {
    return null;
  }

  return (
    <div
      className={`p-4 rounded-lg ${
        isDarkMode
          ? "text-[#ffffff] bg-[#212121]"
          : "text-[#3E5155] bg-white photoservicedetailborderandshado"
      }`}
    >
      <div className="text-lg font-medium font-poppins mb-4">Video</div>

      <div className="w-full flex flex-col gap-4 relative">
        {isYouTubeVideo ? (
          <div className="relative w-full rounded-xl">
            {!isPlaying ? (
              <div className="relative w-full h-[200px] md:h-[315px] rounded-xl">
                <img
                  src={getYouTubeThumbnail(videoUrl)}
                  alt="Video Thumbnail"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={handlePlayVideo}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg"
                >
                  <Image
                    src={playvideobtn}
                    alt="Play Video"
                    width={50}
                    height={50}
                  />
                </button>
              </div>
            ) : (
              <iframe
                width="100%"
                height="315"
                src={getEmbeddedUrl(videoUrl)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            )}
          </div>
        ) : (
          <div className="relative w-full">
            <video
              ref={videoRef}
              width="100%"
              height={240}
              controls={isPlaying}
              className="rounded-lg"
              onPlay={() => setIsPlaying(true)}

            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {!isPlaying && (
              <button
                onClick={handlePlayVideo}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg"
              >
                <Image
                  src={playvideobtn}
                  alt="Play Video"
                  width={50}
                  height={50}
                />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoSectionDetailScreen;

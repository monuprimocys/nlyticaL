import React from "react";
import axios from "axios";
import { Metadata } from "next";
import AboutComponet from "./AboutComponet";

const seoApiUrl = "https://nlytical.theprimocys.com/api/get-homeseo";

// Function to fetch metadata
export async function fetchMetadata(url: string) {
  const localStorageKey = `metadata_${encodeURIComponent(url)}`;

  try {
    // Check localStorage first
    if (typeof window !== "undefined") {
      const cachedData = localStorage.getItem(localStorageKey);
      if (cachedData) {
        console.log("Loaded from localStorage:", JSON.parse(cachedData));
        return JSON.parse(cachedData);
      }
    }

    // Fetch from API if not cached
    const response = await axios.get("https://api.microlink.io", {
      params: { url },
    });

    const data = response.data.data;
    console.log("Fetched from API:", data);

    const metadata = {
      title: data.title || "",
      description: data.description || "",
      image: data.image?.url || data.logo?.url || "",
    };

    // Save to localStorage if in browser environment
    if (typeof window !== "undefined") {
      localStorage.setItem(localStorageKey, JSON.stringify(metadata));
    }

    return metadata;
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return { title: "", description: "", image: "" };
  }
}

// Fetch metadata on the server
export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoResponse = await axios.get(seoApiUrl);
    const seoData = seoResponse.data;
    const seoDetail = seoData?.data["1"] || {};

    const defaultTitle = seoDetail.title
      ? `${seoDetail.title} | Nlytical`
      : "Service Page | Nlytical";
    const defaultDescription =
      seoDetail.body || "Explore various services and details.";
    const defaultImage =
      seoDetail.image ||
      "https://nlyticalapp.com/wp-content/uploads/2025/02/Primocys_social_og_img.jpg";
    const defaultURL = "https://nlyticalapp.com/service";

    return {
      title: defaultTitle,
      description: defaultDescription,
      robots: "index, follow",
      alternates: { canonical: defaultURL },
      openGraph: {
        locale: "en_US",
        siteName: "Primocys | Expert Mobile App Development Company in the USA",
        type: "website",
        title: defaultTitle,
        description: defaultDescription,
        url: defaultURL,
        images: [
          {
            url: defaultImage,
            secureUrl: defaultImage,
            width: 1200,
            height: 630,
            alt: "Service Image",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: "@primocys",
        title: defaultTitle,
        description: defaultDescription,
        creator: "@primocys",
        images: [defaultImage],
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Error | Nlytical",
      description: "An error occurred while fetching the service details.",
      robots: "noindex, nofollow",
    };
  }
}


function page() {
  return (
    <div className=" w-full h-auto">
      <AboutComponet/>
    </div>
  );
}

export default page;

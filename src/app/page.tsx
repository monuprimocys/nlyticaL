import React from "react";
import { Metadata } from "next";
import AllComponetsHomeScrenn from "./componets/homesection/AllComponetsHomeScrenn";

// Fetch metadata on the server
export async function generateMetadata(): Promise<Metadata> {
  const seoApiUrl = "https://nlytical.theprimocys.com/api/get-homeseo";

  try {
    // Fetch SEO data
    const seoResponse = await fetch(seoApiUrl, { method: "GET" });
    const seoData = await seoResponse.json();
    const seoDetail = seoData.data["1"] || {};

    // Default values
    const defaultTitle = seoDetail.title || "Service Page";
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
      alternates: {
        canonical: defaultURL,
      },
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
      title: "Error",
      description: "An error occurred while fetching the service details.",
      robots: "noindex, nofollow",
    };
  }
}

function Page() {
  return (
    <div className="w-full h-auto">
      <AllComponetsHomeScrenn />
    </div>
  );
}

export default Page;

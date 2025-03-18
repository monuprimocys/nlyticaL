import React from "react";
import StoresDetail from "../../storesDetail";
import { Metadata } from "next";

interface PageProps {
  params: { service_name: string; service_id: string };
}

// Function to decode Base64 values
function decodeBase64(value: string): string {
  try {
    return atob(decodeURIComponent(value));
  } catch (error) {
    console.error("Error decoding Base64:", error);
    return value; // Return original value if decoding fails
  }
}

// Fetch metadata on the server
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const decodedServiceId = decodeBase64(params.service_id);

  try {
    const response = await fetch(
      "https://nlytical.theprimocys.com/api/get-servicedetail",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service_id: decodedServiceId }),
      }
    );

    const data = await response.json();
    const serviceDetail = data.serviceDetail;

    return {
      title: serviceDetail.meta_title || `Service - ${decodedServiceId}`,
      description:
        serviceDetail.meta_description ||
        `Details about service ${params.service_name} with ID ${decodedServiceId}.`,
      robots: "max-image-preview:large",
      alternates: {
        canonical: "https://nlyticalapp.com/",
      },
      openGraph: {
        locale: "en_US",
        siteName: "Primocys | Expert Mobile App Development Company in the USA",
        type: "website",

        title:
          serviceDetail.meta_title ||
          "Expert Mobile App Development Company in the USA | Primocys",
        description:
          serviceDetail.meta_description ||
          "As a leading mobile app development company, Primocys offers top-quality mobile app development services for iOS, Android, and cross-platform apps.",
        url: "https://nlyticalapp.com/",
        images: [
          {
            url:
              serviceDetail.cover_image ||
              "https://nlytical.theprimocys.com/assets/images/cov…1356.promenade-beautiful-city-park_1127-3534.avif",
            secureUrl:
              serviceDetail.cover_image ||
              "https://nlytical.theprimocys.com/assets/images/cov…1356.promenade-beautiful-city-park_1127-3534.avif",
            width: 1200,
            height: 600,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: "@primocys",
        title:
          serviceDetail.meta_title ||
          "Expert Mobile App Development Company in the USA | Primocys",
        description:
          serviceDetail.meta_description ||
          "As a leading mobile app development company, Primocys offers top-quality mobile app development services for iOS, Android, and cross-platform apps.",
        creator: "@primocys",
        images: [
          serviceDetail.cover_image ||
            "https://nlyticalapp.com/wp-content/uploads/2025/02/Primocys_social_og_img.jpg",
        ],
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);
    return {
      title: `Service - ${decodedServiceId}`,
      description: `Details about service ${params.service_name} with ID ${decodedServiceId}.`,
    };
  }
}

function Page({ params }: PageProps) {
  const decodedServiceId = decodeBase64(params.service_id);

  return (
    <div className="w-full h-auto">
      <StoresDetail
        serviceName={params.service_name}
        serviceId={decodedServiceId}
      />
    </div>
  );
}

export default Page;

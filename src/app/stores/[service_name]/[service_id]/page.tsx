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

    // Fallback values
    const defaultTitle = `Service - ${decodedServiceId}`;
    const defaultDescription = `Explore the details of ${params.service_name} with ID ${decodedServiceId}.`;
    const defaultImage =
      "https://nlyticalapp.com/wp-content/uploads/2025/02/Primocys_social_og_img.jpg";
    const defaultURL = "https://nlyticalapp.com/";

    console.log(
      " my meta data valyues fromn dynamic @@@@@",
      serviceDetail.cover_image
    );

    return {
      title: serviceDetail.meta_title || defaultTitle,
      description: serviceDetail.meta_description || defaultDescription,
      robots: "max-image-preview:large",
      alternates: {
        canonical: defaultURL,
      },
      openGraph: {
        locale: "en_US",
        siteName: "Primocys | Expert Mobile App Development Company in the USA",
        type: "website",
        title: serviceDetail.meta_title || defaultTitle,
        description: serviceDetail.meta_description || defaultDescription,
        url: defaultURL,
        images: [
          {
            url: serviceDetail.cover_image || defaultImage,
            secureUrl: serviceDetail.cover_image || defaultImage,
            width: 1200,
            height: 630,
            type: "image/jpeg", // Ensure correct image MIME type
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: "@primocys",
        title: serviceDetail.meta_title || defaultTitle,
        description: serviceDetail.meta_description || defaultDescription,
        creator: "@primocys",
        images: [
          {
            url: serviceDetail.cover_image || defaultImage,
            alt: "Service Image",
          },
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

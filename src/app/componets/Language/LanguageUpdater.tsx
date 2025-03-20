import { useEffect } from "react";
import { useMutation } from "react-query";
import axios from "axios";

export const useAddLangKey = () => {
  const baseURL = "https://nlytical.theprimocys.com/api";

  return useMutation(async (payload: { key: string; value: string }) => {
    const response = await axios.post(`${baseURL}/addKey`, payload);
    return response.data;
  });
};

const languageKeys = {
  "Explore More": "Explore More",
  "Search Your Services": "Search Your Services",
  "Location": "Location",
  "Search": "Search",
  "Search for Category or Service": "Search for Category or Service",
  "Search Location": "Search Location",
  "Stay connected with us for the latest updates and exciting news!":
    "Stay connected with us for the latest updates and exciting news!",
  "Your Email Address": "Your Email Address",
  "Submit": "Submit",
  "Use Links": "Use Links",
  "Categories": "Categories",
  "Home": "Home",
  "Subcategory": "Subcategory",
  "Pricing Filter": "Pricing Filter",
  "Rating": "Rating",
  "Stores": "Stores",
  "Vendor Information": "Vendor Information",
  "Member since": "Member Since",
  "Number of Employees": "Number of Employees",
  "Visit Website": "Visit Website",
  "Email on": "Email On",
  "Reviews & Ratings": "Reviews & Ratings",
  "No Data Found": "No Data Found",
  "Ratings": "Ratings",
  "Business Hours": "Business Hours",
  "Video": "Video",
  "Find deals in": "Find Deals In",
  "Nearby Store": "Nearby Store",
  "We are dedicated to delivering innovative solutions that empower our customers and drive meaningful change.":
    "We are dedicated to delivering innovative solutions that empower our customers and drive meaningful change.",
  "15 Years Of Service": "15 Years of Service",
  "Value": "Value",
  "Core Values": "Core Values",
  "Community Responsiveness": "Community Responsiveness",
  "Integrity": "Integrity",
  "Team Work": "Teamwork",
  "Effort": "Effort",
  "Integrity Growth": "Integrity Growth",
  "Vision and Values into action": "Vision and Values into Action",
  "Our Mission": "Our Mission",
  "We are dedicated to delivering innovative solutions.":
    "We are dedicated to delivering innovative solutions.",
  "About Us": "About Us",
  "Store": "Store",
  "Contact Us": "Contact Us",
  "Privacy Policy": "Privacy Policy",
  "Terms & Conditions": "Terms & Conditions",
  "FAQ": "FAQ",
  "Subscribe": "Subscribe",
  "Add Store": "Add Store",
  "Reach out to us with your questions or requests. We are here to assist you!":
    "Reach out to us with your questions or requests. We are here to assist you!",
  "Call Us": "Call Us",
  "Email Us": "Email Us",
  "Address": "Address",
  "List Your Business": "List Your Business",
  "Our Pricing Plan": "Our Pricing Plan",
  "Affordable Price Packages": "Affordable Price Packages",
  "Increase Business Profile Score": "Increase Business Profile Score",
  "Reach Out to More Customers": "Reach Out to More Customers",
  "Grow Your": "Grow Your",
  "Business": "Business",
  "Get Started": "Get Started",
  "Business By Boosting": "Business by Boosting",
  "You haven’t subscribed to be a Vendor": "You haven’t subscribed to be a vendor.",
  "First, subscribe to become a vendor and create your store.":
    "First, subscribe to become a vendor and create your store.",
};

const LanguageUpdater = () => {
  const addLangKey = useAddLangKey();

  // useEffect(() => {
  //   Object.entries(languageKeys).forEach(([key, value]) => {
  //     addLangKey.mutate({ key, value });
  //   });
  // }, []);

  return null; // No UI needed, just triggering API calls
};

export default LanguageUpdater;

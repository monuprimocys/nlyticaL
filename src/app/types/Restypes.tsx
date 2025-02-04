import { StaticImageData } from "next/image";

//  Card types

export interface HomeSectionCardRes {
  image: string;
  title: string;
}

//  HomeSectionmainCardRes

export interface HomeSectionMainCardRes {
  mainimage: StaticImageData;
  category: string;
  avatar: string;
  name: string;
  businessName: string;
  reviews: string;
  yearsInBusiness: string;
  location: string;
  priceRange: string;
  featured: string;
}

// HomeSection8CardRes

export interface HomeSection8CardRes {
  avatar: StaticImageData;
  title: string;
  name: string;
  position: string;
}

// heading types

export interface HeadingcontentProps {
  title: string;
  highlightedTitle: string;
}

// SubCategoryCardRes

export interface SubCategoryCardRes {
  image: StaticImageData;
  categoryName: string;
  listingCount: string;
  onClick: () => void;
}

//  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ API RESPONCE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//  CategoriesResponse

export interface GetAllCategoryRes {
  status: boolean;
  message: string;
  data: Categorydata[];
}

export interface Categorydata {
  id: number;
  category_name: string;
  category_image: string;
  subcategories_count: number;
  onClick?: () => void;
}

// SubCategoryResponse

export interface GetAllSubCategoryRes {
  status: boolean;
  message: string;
  totalSubCategoryCount: number;
  subCategoryData: SubCategoryData[];
}

export interface SubCategoryData {
  id: number;
  category_id: number;
  subcategory_image: string;
  subcategory_name: string;
  services_count: number;
  onClick?: () => void;
}

// add-customersupport

export interface AddCustomerSupportRes {
  name: string;
  email: string;
  phone: string;
  message: string;
}

//  User Registration

export interface AddUserRegistrationRes {
  first_name: string;
  email: string;
  password: string;
  last_name: string;
  new_mobile: string;
  username: string;
  country_code: string;
  role: string;
  mobile: string;
}

// RegisterModalVerifyOtp and ForgotPassword

export interface RegisterModalVerifyOtpRes {
  email: string;
  otp: string;
}

// Resend Otp
export interface ResendotpandForgetpwdRes {
  email: string;
}

// RegisterWithmobailnumber

export interface RegisterWithMobailnumberRes {
  mobile: string;
  country_code: string;
  role: string;
}

// login user

export interface LoginUserRes {
  email: boolean;
  password: string;
}

// Reset password

export interface ResetPasswordRes {
  email: string;
  password: string;
  confirm_password: string;
}

// user Profile

export interface GetAlluserprofileRes {
  status: boolean;
  message: string;
  guest_user: number;
  UserDetails: UserDetails;
  subscribed_user: number;
  subscriptionDetails: SubscriptionDetails;
}

export interface UserDetails {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  country_code: string;
  image: string;
}

export interface SubscriptionDetails {
  user_id: number;
  plan_name: string;
  price: string;
  expire_date: Date;
  plan_image: string;
}

//  Profile Update

export interface ProfileUpdate {
  status: boolean;
  message: string;
  userdetails: Userdetails;
  subscriptionDetails: SubscriptionDetails;
}

export interface SubscriptionDetails {
  user_id: number;
  plan_name: string;
  price: string;
  expire_date: Date;
  plan_image: string;
}

export interface Userdetails {
  id: number;
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
  password: string;
  username: string;
  country_code: string;
  role: string;
  image: string;
  subscribed_user: number;
}

//  my review List

export interface MyReviewList {
  status: boolean;
  message: string;
  reviewlist: Reviewlist[];
}

export interface Reviewlist {
  id: number;
  user_id: number;
  service_id: number;
  review_star: string;
  review_message: string;
  created_at: Date;
  service_name: string;
  category_name: string;
  service_images: string[];
}

// term conditions

export interface TermconditionRes {
  status: boolean;
  message: string;
  data: Text[];
}

export interface Text {
  id: number;
  text: string;
}

//  privacy and policy settings

export interface PrivacypolicyRes {
  status: boolean;
  message: string;
  data: text[];
}

export interface text {
  id: number;
  text: string;
}

//   All servires liked

export interface GetlikedservicesRes {
  status: boolean;
  message: string;
  ServiceLikedList: ServiceLikedList[];
}

export interface ServiceLikedList {
  id: number;
  category_id: number;
  service_name: string;
  vendor_id: number;
  address: string;
  lat: string;
  lon: string;
  category_name: string;
  totalReviewCount: number;
  totalAvgReview: string;
  service_images: string;
  isLike: number;
}

// app-feedback

export interface AppFeedbackRes {
  feedback_review: string;
}

// Add services

export interface AddServiceRes {
  vendor_id?: string;
  service_name?: string;
  service_email?: string;
  service_image?: string[];
  is_featured?: string;
  service_description?: string;
  category_id?: string;
  subcategory_idt?: string;
  service_website?: string;
  service_phone?: string;
  address?: string;
  open_days?: string[];
  lat?: string;
  lon?: string;
  closed_days?: string;
  open_time?: string;
  close_time?: string;
  whatsapp_link?: string;
  instagram_link?: string;
  facebook_link?: string;
  twitter_link?: string;
  video_thumbnail?: string;
  video?: string;
  aspect_ratio?: string;
  employee_strength?: string;
  published_month?: string;
  published_year?: string;
  add_new_post_steps?: 1 | 2 | 3;
}

//  filter reponse categories and subcategory

export interface FilterRes {
  status: boolean;
  message: string;
  serviceFilter: ServiceFilter[];
  total_page: number;
}

export interface ServiceFilter {
  id: number;
  service_name: string;
  category_name: string;
  address: string;
  lat: string;
  lon: string;
  is_featured: number;
  service_price: string;
  published_year: string;
  service_images: string[];
  isLike: number;
  total_review_count: number;
  average_review_star: string;
  first_name: string;
  last_name: null | string;
  image: string;
}

// like service

export interface FavouritePropertiesRes {
  status: boolean;
  message: string;
  ServiceLikedList: ServiceLikedList[];
}

export interface ServiceLikedList {
  id: number;
  category_id: number;
  service_name: string;
  vendor_id: number;
  address: string;
  lat: string;
  lon: string;
  category_name: string;
  totalReviewCount: number;
  totalAvgReview: string;
  service_images: string;
  first_name: null | string;
  last_name: null | string;
  image: string;
  isLike: number;
}

// ++++++++++++++++++++++++++++++++++++++++++ Detail Screen +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export interface ServiceDetailScreenRes {
  status: boolean;
  message: string;
  vendor: number;
  vendorDetails: VendorDetails;
  serviceDetail: ServiceDetail;
  stores: Store[];
}

export interface ServiceDetail {
  id: number;
  vendor_id: number;
  category_id: number;
  service_name: string;
  service_description: string;
  service_website: string;
  service_phone: string;
  address: string;
  lat: string;
  lon: string;
  open_days: string[];
  closed_days: string[];
  open_time: string;
  close_time: string;
  video_thumbnail: string;
  video: string;
  instagram_link: string;
  facebook_link: string;
  whatsapp_link: string;
  twitter_link: string;
  subcategory_id: string;
  service_email: string;
  cover_image: string;
  published_month: string;
  published_year: string;
  price_range: string;
  total_stores_count: number;
  total_years_count: number;
  distance: string;
  category_name: string;
  subcategory_names: string[];
  vendor_email: string;
  service_images: string[];
  isLike: number;
  totalReviewCount: number;
  totalAvgReview: string;
  reviews: Review[];
}

export interface Review {
  id: number;
  service_id: number;
  user_id: number;
  review_star: string;
  review_message: string;
  created_at: Date;
  first_name: string;
  last_name: string;
  image: string;
}

export interface Store {
  id: number;
  store_name: string;
  store_description: string;
  price: string;
  mobile: string;
  category: string;
  store_images: string[];
  store_attachments: string[];
}

export interface VendorDetails {
  id: number;
  first_name: string;
  last_name: string;
  vendor_email: string;
  image: string;
  last_seen: string;
}

//  Add Review Details screen

export interface AddReviewDetailsRes {
  status: boolean;
  message: string;
}

//  update service

export interface ServiceUpdateRes {
  status: boolean;
  message: string;
  service: Service;
  service_images: string[];
  service_video: string;
}

export interface Service {
  id: number;
  vendor_id: number;
  category_id: number;
  subcategory_id: string;
  service_name: string;
  service_description: string;
  service_website: string;
  service_country_code: string;
  service_phone: string;
  service_email: string;
  service_price: string;
  address: string;
  lat: string;
  lon: string;
  area: string;
  city: string;
  state: string;
  country: string;
  status: number;
  open_days: string;
  closed_days: string;
  open_time: string;
  close_time: string;
  is_featured: number;
  instagram_link: string;
  facebook_link: string;
  whatsapp_link: string;
  twitter_link: string;
  video_thumbnail: string;
  video: string;
  cover_image: string;
  aspect_ratio: string;
  employee_strength: string;
  published_month: string;
  published_year: string;
  request_approval: number;
  meta_title: string;
  meta_description: string;
  created_at: Date;
  updated_at: Date;
}

//  remove service images

export interface RemoveServiceImagesRes {
  vendor_id: string;
  service_id: string;
  service_image_id: string;
}

//  store list

export interface StorelistRes {
  status: boolean;
  message: string;
  StoreList: StoreList[];
}

export interface StoreList {
  id: number;
  store_name: string;
  store_description: string;
  price: string;
  store_images: Store[];
  store_attachments: Store[];
}

export interface Store {
  id: number;
  url: string;
}

// ++++++++++++++++++++++++++++++++++++update store +++++++++++++++++++++++++++++++++++++

export interface StoreUpdateRes {
  status: boolean;
  message: string;
  store: Store;
}

export interface Store {
  id: number;
  service_id: string;
  store_name: string;
  store_description: string;
  price: string;
  created_at: Date;
  updated_at: Date;
  storeImages: StoreImage[];
  storeAttachments: StoreAttachment[];
}

export interface StoreAttachment {
  id: number;
  store_attachments: string;
}

export interface StoreImage {
  id: number;
  store_images: string;
}

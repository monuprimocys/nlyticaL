// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";

// All Sliced Files
import counterReducer from "./Slice/counterSlice";
import customerSupportReducer from "./Slice/AddCustomerSupportSlice";
import modalReducer from "./Slice/modalSlice";
import loginReducer from "./Slice/LoginSlice";
import RegistrationReducer from "./Slice/RegistrationSlice";
import ForgotpwdReducer from "./Slice/ForgotpwdSlice";
import ResetPasswordReducer from "./Slice/ResetPasswordSlice";
import CategorySelectedIDandValuesReducer from "./Slice/AddpostSelectedIDandvalues/CategorySelectedIDandValues";
import SubCategorySelectedIdandValuesReducer from "./Slice/AddpostSelectedIDandvalues/SubCategorySelectedIdandValues";
import monthYearReducer from "./Slice/AddpostSelectedIDandvalues/monthYearSlice";
import FirstStepFormValuesReducer from "./Slice/AddpostSelectedIDandvalues/FirstStepFormValues";
import FirstStepReducer from "./Slice/AddpostSelectedIDandvalues/FirstStep";
import AddPostSlice from "./Slice/AddPostSlice";
import businessReducer from "./Slice/AddpostSelectedIDandvalues/businessSlice";
import locationReducer from "./Slice/locationSlice";
import addressReducer from "./Slice/AddressSlice";
import CurrentLocationReducer from "./Slice/AddpostSelectedIDandvalues/CurrentLocation";
import categoryReducer from "./Slice/category/categorySlice";
import SubCategoryReducer from "./Slice/category/subcategorySlice";
import filterSliceReducer from "./Slice/category/filterSlice";
import ratingReducer from "./Slice/category/ratingSlice";
import priceReducer from "./Slice/category/priceSlice";
import SerachLocationReducer from "./Slice/category/SerachLocationSlice";
import likeStatusReduce from "./Slice/category/likeStatusSlice";
import categoryListingReducer from "./Slice/Listing/CategoryLIstingSlice";
import SubCategoryListingReducer from "./Slice/Listing/SubCategoryListing";
import PriceSliceListingReducer from "./Slice/Listing/PriceSliceListing";
import FilterListingSliceReducer from "./Slice/Listing/FilterListingSlice";
import RatingSliceListingReducer from "./Slice/Listing/RatingSliceListing";
import searchReducer from "./Slice/Listing/searchSlice";
import searchInputBoxReducer from "./Slice/category/SearchInputBoxSice";
import serviceDetailReducer from "./Slice/ServiceDetail/ServiceDetailScreenSlice";
import serviceDetailScreenInputReducer from "./Slice/ServiceDetail/serviceDetailScreenInputSlice";
import UpdateprofileSliceReucer from "./Slice/UpdateprofileSlice";
import serviceReducer from "./Slice/serviceSlice";

// All API File
import { GetAllCategory } from "./api/useGetCategory";
import { GetAllSubCategory } from "./api/useGetAllSubCategory";
import { AddCustomerSupport } from "./api/add-customersupport";
import { LoginUser } from "./api/auth/user-login";
import { NewUserRegisterAccount } from "./api/auth/newuser-registeraccount";
import { ResendotpandForgetpwd } from "./api/auth/ResendotpandForgetpwd";
import { ForgotPasswordVerifyOtp } from "./api/auth/Forgetpasswordotp-verify";
import { Resetpassword } from "./api/auth/Resetpassword";
import { getuserprofile } from "./api/auth/getuserprofile";
import { updateuserprofile } from "./api/auth/ProfileUpdate";
import { userReviewlist } from "./api/reviewApi/userreviewlist";
import { termAndcondition } from "./api/termAndcondition";
import { PrivacypolicyRes } from "./api/PrivacypolicyRes";
import { deleteuseraccount } from "./api/auth/deleteuseraccount";
import { ServiceLikedList } from "./api/ServiceLikedList";
import { appfeedback } from "./api/appfeedback";
import { AddService } from "./api/AddService";
import { filter } from "./api/filter";
import { servicelike } from "./api/servicelike";
import { updateService } from "./api/updateServiceApi";

export const store = configureStore({
  reducer: {
    // All slices method
    counter: counterReducer,
    customerSupport: customerSupportReducer,
    modals: modalReducer,
    login: loginReducer,
    registration: RegistrationReducer,
    forgotpwd: ForgotpwdReducer,
    resetPassword: ResetPasswordReducer,
    categorySelected: CategorySelectedIDandValuesReducer,
    subCategorySelected: SubCategorySelectedIdandValuesReducer,
    monthYear: monthYearReducer,
    firstStepFormValues: FirstStepFormValuesReducer,
    firstStep: FirstStepReducer,
    AddPost: AddPostSlice,
    businessHours: businessReducer,
    location: locationReducer,
    address: addressReducer,
    currentLocation: CurrentLocationReducer,
    category: categoryReducer,
    subcategory: SubCategoryReducer,
    filterSlice: filterSliceReducer,
    rating: ratingReducer,
    price: priceReducer,
    SerachLocationSlice: SerachLocationReducer,
    likeStatus: likeStatusReduce,
    categoryListing: categoryListingReducer,
    SubCategoryListing: SubCategoryListingReducer,
    PriceSliceListing: PriceSliceListingReducer,
    FilterListingSlice: FilterListingSliceReducer,
    RatingSliceListing: RatingSliceListingReducer,
    search: searchReducer,
    searchInputBox: searchInputBoxReducer,
    serviceDetail: serviceDetailReducer,
    serviceDetailScreenInput: serviceDetailScreenInputReducer,
    UpdateprofileSlice: UpdateprofileSliceReucer,
    service: serviceReducer,

    // All Api Methods
    [GetAllCategory.reducerPath]: GetAllCategory.reducer,
    [GetAllSubCategory.reducerPath]: GetAllSubCategory.reducer,
    [AddCustomerSupport.reducerPath]: AddCustomerSupport.reducer,
    [LoginUser.reducerPath]: LoginUser.reducer,
    [NewUserRegisterAccount.reducerPath]: NewUserRegisterAccount.reducer,
    [ResendotpandForgetpwd.reducerPath]: ResendotpandForgetpwd.reducer,
    [ForgotPasswordVerifyOtp.reducerPath]: ForgotPasswordVerifyOtp.reducer,
    [Resetpassword.reducerPath]: Resetpassword.reducer,
    [getuserprofile.reducerPath]: getuserprofile.reducer,
    [updateuserprofile.reducerPath]: updateuserprofile.reducer,
    [userReviewlist.reducerPath]: userReviewlist.reducer,
    [termAndcondition.reducerPath]: termAndcondition.reducer,
    [PrivacypolicyRes.reducerPath]: PrivacypolicyRes.reducer,
    [deleteuseraccount.reducerPath]: deleteuseraccount.reducer,
    [ServiceLikedList.reducerPath]: ServiceLikedList.reducer,
    [appfeedback.reducerPath]: appfeedback.reducer,
    [AddService.reducerPath]: AddService.reducer,
    [filter.reducerPath]: filter.reducer,
    [servicelike.reducerPath]: servicelike.reducer,
    [updateService.reducerPath]: updateService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(GetAllCategory.middleware)
      .concat(GetAllSubCategory.middleware)
      .concat(AddCustomerSupport.middleware)
      .concat(LoginUser.middleware)
      .concat(NewUserRegisterAccount.middleware)
      .concat(ResendotpandForgetpwd.middleware)
      .concat(ForgotPasswordVerifyOtp.middleware)
      .concat(Resetpassword.middleware)
      .concat(getuserprofile.middleware)
      .concat(updateuserprofile.middleware)
      .concat(userReviewlist.middleware)
      .concat(termAndcondition.middleware)
      .concat(PrivacypolicyRes.middleware)
      .concat(deleteuseraccount.middleware)
      .concat(ServiceLikedList.middleware)
      .concat(appfeedback.middleware)
      .concat(AddService.middleware)
      .concat(filter.middleware)
      .concat(servicelike.middleware)
      .concat(updateService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

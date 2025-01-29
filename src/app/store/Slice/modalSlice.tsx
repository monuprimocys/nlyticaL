import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  loginModal: boolean;
  AddPostModal: boolean;
  RegisterModal: boolean;
  RegisterModalVerifyOtpModal: boolean;
  RegisterWithMobilenumber: boolean;
  RegisterWithMobilenumberVerifyOtpModal: boolean;
  ForgotPasswordModal: boolean;
  ForgotPasswordOtpVerfiyModal: boolean;
  ResetPasswordModal: boolean;
  DeleteAccount: boolean;
  AppFeedback: boolean;
  AppLanguage: boolean;
  ShareAppModal: boolean;
  LogoutModal: boolean;
  CompleteAddressModal: boolean;
  ServiceDetailPhotoSectionModal: boolean;
  ServiceDetailScreenModalImage: boolean;
  ServiceDetailScreenFiltterModal: boolean;
  ServiceDetailScreenRatingModal: boolean;
  ServiceDetailScreenImageSubModal: boolean;
  BusinessNameModal: boolean;
  ContactDetailsModal: boolean;
  BusinessAddressToolsModal: boolean;
  BusinessTimingsModal: boolean;
  YearEstablishmentModal: boolean;
  BusinesscategoriesModal: boolean;
  NumberofEmployeesModal: boolean;
  BusinessImagesModal: boolean;
  BusinessWebsiteModal: boolean;
  FollowSocialMediaModal: boolean;
}

const initialState: ModalState = {
  loginModal: false,
  AddPostModal: false,
  RegisterModal: false,
  RegisterModalVerifyOtpModal: false,
  RegisterWithMobilenumber: false,
  RegisterWithMobilenumberVerifyOtpModal: false,
  ForgotPasswordModal: false,
  ForgotPasswordOtpVerfiyModal: false,
  ResetPasswordModal: false,
  DeleteAccount: false,
  AppFeedback: false,
  AppLanguage: false,
  ShareAppModal: false,
  LogoutModal: false,
  CompleteAddressModal: false,
  ServiceDetailPhotoSectionModal: false,
  ServiceDetailScreenModalImage: false,
  ServiceDetailScreenFiltterModal: false,
  ServiceDetailScreenRatingModal: false,
  ServiceDetailScreenImageSubModal: false,
  BusinessNameModal: false,
  ContactDetailsModal: false,
  BusinessAddressToolsModal: false,
  BusinessTimingsModal: false,
  YearEstablishmentModal: false,
  BusinesscategoriesModal: false,
  NumberofEmployeesModal: false,
  BusinessImagesModal: false,
  BusinessWebsiteModal: false,
  FollowSocialMediaModal: false,
};

const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<keyof ModalState>) => {
      state[action.payload] = true;
    },
    hideModal: (state, action: PayloadAction<keyof ModalState>) => {
      state[action.payload] = false;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;

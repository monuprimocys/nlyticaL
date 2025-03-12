import "./globals.css";
import Header from "./header/page";
import StoreProvider from "./storeApp/StoreProvider";
import { ToastContainer } from "react-toastify";
import { Metadata } from "next";
import VisitedModal from "./componets/modal/VisitedModal";
import Fotter from "./fotter/page";

export const metadata: Metadata = {
  title: "Nlytical - On-Demand Home Services",
  description: "Explore a complete solution for home services with Nlytical.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>{/* Any additional meta tags or styles */}</head>
      <body className="bg-white">
        <StoreProvider>
          <Header />
          {children}
          <Fotter />
          <VisitedModal />
        </StoreProvider>
        <ToastContainer position="top-right" autoClose={5000} />
      </body>
    </html>
  );
}

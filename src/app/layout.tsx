"use client"; // Ensure client-side rendering

import "./globals.css";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";

// Dynamically import components to prevent SSR

const StoreProvider = dynamic(() => import("./storeApp/StoreProvider"), {
  ssr: false,
});
const Header = dynamic(() => import("./header/page"), { ssr: false });
const Fotter = dynamic(() => import("./fotter/page"), { ssr: false });
// const VisitedModal = dynamic(() => import("./componets/modal/VisitedModal"), {
//   ssr: false,
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>{/* Additional meta tags or styles */}</head>
      <body className="bg-white">
        <StoreProvider>
          <Header />
          {children}
          <Fotter />
        </StoreProvider>
        <ToastContainer position="top-right" autoClose={5000} />
      </body>
    </html>
  );
}

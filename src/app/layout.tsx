import type { Metadata } from "next";
import "./globals.css";
import Header from "./header/page";
import Fotter from "./fotter/page";
import StoreProvider from "./store/StoreProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "nlytical ",
  description: "nlytical",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body>
          <Header />
          {children}
          <Fotter />
        </body>

        <Toaster
          toastOptions={{ duration: 3000 }}
          position="top-center"
          reverseOrder={false}
        />
      </StoreProvider>
    </html>
  );
}

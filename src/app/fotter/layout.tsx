import type { Metadata } from "next";
import "./fotter.module.css";

export const metadata: Metadata = {
  title: "nlytical fotter",
  description: "nlytical fotter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

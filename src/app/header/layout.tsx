import type { Metadata } from "next";
import  "./header.module.css"

export const metadata: Metadata = {
  title: "nlytical header",
  description: "nlytical",
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

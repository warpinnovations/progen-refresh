import type { Metadata } from "next";
import "../globals.css"

export const metadata: Metadata = {
  title: "Prometheus PH - Contacts Page",
  description: "Contacts Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
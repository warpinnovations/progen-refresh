import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";
import { Oxanium } from "next/font/google";
import { Montserrat, Lato } from "next/font/google";

const oxaniumFont = Oxanium({ weight: '500',subsets: ["latin"], });

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

const lato = Lato({ 
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Prometheus PH",
  description: "Prometheus is the premier full-service public relations firm and marketing agency in Western Visayas, specializing in creating and amplifying powerful stories that build and grow brands. Our team is dedicated to helping clients optimize their communications, create high-impact customer experiences, and reach wider audiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-4KWX4DWN7D" />
      <body className={`${oxaniumFont.className} ${montserrat.variable} ${lato.variable} overflow-x-hidden  w-auto h-auto`}>
        {" "}
        {children}
        
      </body>
    </html>
  );
}

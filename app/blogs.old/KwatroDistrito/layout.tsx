import type { Metadata } from "next";
import type { CustomMetadata } from "../blogTypes";
import "../../globals.css"
import Head from "next/head";

export const metadata: CustomMetadata = {
  title: "Bugal Sang Kwatro Distrito",
  description: "Campaign sets the Fourth District of Iloilo on the Tourist Map",
  image: "/BlogAssets/landscape_map.webp",  // Example image URL
  authors: [{name: "Prometheus"}]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta name="author" content={metadata.authors.map(author => author.name).join(", ")} />
      </Head>
      <body className="bg-black " >
        {children}
      </body>
    </html>
  );
}

import type { CustomMetadata } from "../blogTypes";
import "../../globals.css"
import Head from "next/head";

export const metadata: CustomMetadata = {
  title: "THE BEAUTY OF THE STRUGGLE",
  description: "How the Prometheus founder launched an award-winning marketing rocketship from a small bedroom",
  image: "/BlogAssets/BeautyOfStruggleBlogs/InterstellarGroupPhoto.webp",  
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
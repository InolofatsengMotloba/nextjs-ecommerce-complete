import "./globals.css";
import { Nerko_One } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

// Configure the Nerko One font
const nerkoOne = Nerko_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: "Her Store",
  description:
    "Explore a place where limitless options come together with your everyday must-haves. Find everything you need to enhance your daily life.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={nerkoOne.className}>
      <head>
        {/* Meta data */}

        <title>Her Store</title>
        <meta name="title" content="Her Store" />
        <meta
          name="description"
          content="Explore a place where limitless options come together with your everyday must-haves. Find everything you need to enhance your daily life."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta property="og:title" content="Her Store" />
        <meta
          property="og:description"
          content="Explore a place where limitless options come together with your everyday must-haves. Find everything you need to enhance your daily life."
        />
        <meta
          property="og:image"
          content="https://metatags.io/images/meta-tags.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:title" content="Her Store" />
        <meta
          property="twitter:description"
          content="Explore a place where limitless options come together with your everyday must-haves. Find everything you need to enhance your daily life."
        />
        <meta
          property="twitter:image"
          content="https://metatags.io/images/meta-tags.png"
        />

        {/* Favicon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
      </head>
      <body className="flex flex-col min-h-screen">
        <NavBar />
        <AuthProvider>{children}</AuthProvider>
        <Footer />
      </body>
    </html>
  );
}

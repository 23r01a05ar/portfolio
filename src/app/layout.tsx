import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Vallabha | Android Dev · Full Stack · Cloud AI",
  description:
    "Portfolio of Kanchumarthi Sai Sri Vallabha — CSE undergrad at CMRIT Hyderabad. Android Developer, Full Stack Developer, and aspiring Cloud AI Engineer.",
  keywords: ["Android Developer", "Full Stack", "Cloud AI", "CMRIT", "Hyderabad", "Kotlin", "React", "GCP"],
  openGraph: {
    title: "Vallabha | Portfolio",
    description: "Android Dev · Full Stack · Cloud AI Engineer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              border: "4px solid #000",
              borderRadius: 0,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              boxShadow: "6px 6px 0px 0px #000",
            },
          }}
        />
      </body>
    </html>
  );
}

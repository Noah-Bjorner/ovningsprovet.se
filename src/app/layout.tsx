import type { Metadata } from "next";
import { Google_Sans_Flex } from "next/font/google";
import "./globals.css";

const googleSansFlex = Google_Sans_Flex({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  axes: ["GRAD", "ROND", "wdth"],
  adjustFontFallback: false,
  variable: "--font-google-sans-flex",
});

export const metadata: Metadata = {
  title: "Övningsprovet.se",
  description: "Övningsprovet.se är en webbplats som hjälper dig att förbereda dig för dina prov.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${googleSansFlex.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

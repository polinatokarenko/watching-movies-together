import type { Metadata } from "next";
import { Montserrat, Bebas_Neue } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-family",
  weight: "500",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--second-family",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YURIN",
  description: "Watch movies and TV series with friends from anywhere in the world",
};

export default function RootLayoutRootLayout({children}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${bebasNeue.variable}`}>
        {children}
      </body>
    </html>
  );
}

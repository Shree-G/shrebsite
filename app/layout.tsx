import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "./components/Navbar";
import PlantTrees from "./components/PlantTrees";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shree Gopalakrishnan",
  description: "shree's personal website",
};

const nunito = Nunito({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} bg-pale-yellow`}>
        <div className="relative">
          <Navbar />
          <PlantTrees />
          {children}
        </div>
      </body>
    </html>
  );
}

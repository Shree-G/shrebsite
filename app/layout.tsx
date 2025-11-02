import type { Metadata } from "next";
import { Nunito, Limelight, Fondamento } from "next/font/google";
import Navbar from "./components/Navbar";
import PlantTrees from "./components/PlantTrees";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shree Gopalakrishnan",
  description: "shree's personal website",
};

const nunito = Nunito({ subsets: ["latin"], variable: "--font-sans" });
const limelight = Limelight({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const fondamento = Fondamento({ subsets: ["latin"], weight: "400", variable: "--font-mono" });

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

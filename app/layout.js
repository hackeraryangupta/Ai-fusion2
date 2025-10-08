
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./Provider"; // client component
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "AI Fusion",
  description: "Next.js + Clerk + next-themes setup",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      {/* RootLayout is a server component */}
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Provider>{children}</Provider> {/* client component */}
        </body>
      </html>
    </ClerkProvider>
  );
}

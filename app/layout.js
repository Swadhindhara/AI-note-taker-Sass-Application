import localFont from "next/font/local";
import "./globals.css";
import { Outfit } from "next/font/google";
import Provider from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "AI Note Taking - SASS Application",
  description: "Generated by create next app",
};

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={``}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}

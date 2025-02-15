import { Montserrat, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react"

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "300", "600", "700", "800", "900"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "MPVILLAMARIN",
  description: "Portafolio profesional - María Paula Villamarín",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${robotoMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

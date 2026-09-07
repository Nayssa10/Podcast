import type { Metadata } from "next";
import { Playfair_Display, Monsieur_La_Doulaise, Montserrat, Courier_Prime, Satisfy } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const monsieurLaDoulaise = Monsieur_La_Doulaise({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-monsieur",
  display: "swap",
});

const satisfy = Satisfy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-satisfy",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier",
  display: "swap",
});

export const metadata: Metadata = {
  title: "team SUPERNOVA | Libros • Romance • Criminalística",
  description: "Podcast oficial de team SUPERNOVA. Un espacio dedicado a la literatura, el romance y la investigación criminal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${monsieurLaDoulaise.variable} ${montserrat.variable} ${courierPrime.variable} ${satisfy.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

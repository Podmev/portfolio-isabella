import { Forum, Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const forum = Forum({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata = {
  title: {
    template: "%s | Isabella Camardella",
    default: "External Writer Portfolio",
  },
  description:
    "External writer portfolio powered by Copy Vortex.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${forum.variable}`}>{children}</body>
    </html>
  );
}


import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import { Eczar } from "next/font/google";
// These styles apply to every route in the application
import "@/styles/globals.css";

const eczar = Eczar({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Portfolio: Isabella",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${eczar.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}>
        <header>
          <Logo />
          <Navigation />
        </header>
        <main className="grid grid-cols-[16rem_1fr] h-full">{children}</main>
        <footer>Copyright by Isabella Camardella</footer>
      </body>
    </html>
  );
}

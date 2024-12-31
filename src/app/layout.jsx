import { Eczar } from "next/font/google";
// These styles apply to every route in the application
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const eczar = Eczar({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "%s | Portfolio: Isabella",
    default: "Welcome | Portfolio: Isabella",
  },
  description:
    "Portfolio of Isabella Camardella with full information about experiences, works, education and detailed collection of own written articles",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${eczar.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}>
        <Header/>
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
              {children}
          </main>
        </div>
        <Footer/>
      </body>
    </html>
  );
}

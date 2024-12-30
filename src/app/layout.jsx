import Logo from "../components/Logo";
import Navigation from "../components/Navigation";

// These styles apply to every route in the application
import "@/styles/globals.css";

export const metadata = {
  title: "Portfolio: Isabella",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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

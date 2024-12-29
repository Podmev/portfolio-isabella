import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";

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

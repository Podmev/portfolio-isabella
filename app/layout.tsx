import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";
import LayoutProps from "./_types/LayoutProps";

export const metadata = {
  title: "Portfolio: Isabella",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>Copyright by Isabella Camardella</footer>
      </body>
    </html>
  );
}

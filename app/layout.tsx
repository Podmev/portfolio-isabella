import Navigation from "./_components/Navigation";
import LayoutProps from "./_types/LayoutProps";

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
        <footer>Copyright by Isabella Camardella</footer>
      </body>
    </html>
  );
}

function getWriterName(portfolio) {
  return portfolio?.profile?.publicName || portfolio?.user?.name || portfolio?.writer?.profile?.publicName || "Writer";
}

export default function Footer({ portfolio }) {
  const year = new Date().getFullYear();
  const name = getWriterName(portfolio);

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>&copy; {year} {name}. All rights reserved.</p>
        <p>Developed by Dmitrii Pozdin</p>
      </div>
    </footer>
  );
}

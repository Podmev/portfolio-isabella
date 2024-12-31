import Image from "next/image";
import Link from "next/link";
import logo from "/public/logo.png"

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image src={logo} height="60" width="60" alt="Portfolio: Isabella Camardella" quality={90}/>
      <span className="text-3xl font-semibold text-primary-100">
        Portfolio: Isabella Camardella
      </span>
    </Link>
  );
}

export default Logo;

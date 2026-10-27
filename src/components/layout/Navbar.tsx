import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <div className="fixed top-6 left-6 sm:left-16 lg:left-[18%] z-40">
      <Link href="/" aria-label="890 ARQ - Inicio" className="block">
        <Image
          src="/images/logo-890arq.svg"
          alt="890 ARQ"
          width={82}
          height={79}
          priority
          className="w-[74px] sm:w-[82px] h-auto select-none"
        />
      </Link>
    </div>
  );
}

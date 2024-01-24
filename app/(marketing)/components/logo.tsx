import Image from "next/image";
import { Work_Sans } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-4">
      <Image src="/favicon.png" height={40} width={40} alt="Logo" />
      <p className={cn("font-medium text-2xl text-primary", font)}>Irja</p>
    </div>
  );
};

export default Logo;

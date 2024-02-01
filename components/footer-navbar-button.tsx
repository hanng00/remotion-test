import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface FooterNavbarButtonProps {
  href: string;
  label: string;
  icon: LucideIcon;
}

const FooterNavbarButton = ({
  href,
  label,
  icon: Icon,
}: FooterNavbarButtonProps) => {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "text-xs font-medium transition-colors hover:text-primary",
        path !== href && "text-muted-foreground"
      )}
    >
      <div className="flex flex-col items-center">
        <Icon size={20} />
        <p >{label}</p>
      </div>
    </Link>
  );
};

export default FooterNavbarButton;

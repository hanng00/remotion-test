import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface FooterNavbarProps {
  onCreateNew: () => void;
}

const FooterNavbar = ({ onCreateNew }: FooterNavbarProps) => {
  return (
    <div className="h-16 border-t flex flex-row items-center justify-center">
      <Button onClick={onCreateNew} className="h-14 p-0 relative -top-8 rounded-full aspect-square">
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default FooterNavbar;

import { Button } from "@/components/ui/button";
import { PanelsRightBottomIcon, Plus, Projector } from "lucide-react";
import FooterNavbarButton from "./footer-navbar-button";

interface FooterNavbarProps {
  onCreateNew: () => void;
}

const FooterNavbar = ({ onCreateNew }: FooterNavbarProps) => {
  return (
    <div className="border-t flex flex-row items-center justify-evenly">
      <FooterNavbarButton
        href="/slides"
        label="Slides"
        icon={PanelsRightBottomIcon}
      />

      <Button
        onClick={onCreateNew}
        className="h-14 p-0 relative -top-8 rounded-full aspect-square"
      >
        <Plus className="w-6 h-6" />
      </Button>

      <FooterNavbarButton
        href="/carousels"
        label="Carousels"
        icon={Projector}
      />
    </div>
  );
};

export default FooterNavbar;

"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const LINKS = [
  {
    href: "/legacy/example-one",
    label: "Example One",
  },
  {
    href: "/legacy/example-two",
    label: "Example Two",
  },
  {
    href: "/legacy/example-three",
    label: "Example Three",
  },
  {
    href: "/legacy/example-four",
    label: "Example Four",
  },
];

const HomePage = () => {
  const router = useRouter();

  return (
    <div className="container h-full">
      <div className="h-full flex flex-col items-center justify-center space-y-8">
        <div>
          <h1 className="text-6xl font-bold font-serif text-center py-2">
            Irja
          </h1>
          <p className="text-primary/70 bg">
            Or, this codebase aims at learning how the Remotion library works
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          {LINKS.map((link, idx) => {
            return (
              <Button key={idx} onClick={() => router.push(link.href)}>
                <ArrowRight className="h-4 w-4 m-1" /> {link.label}
              </Button>
            );
          })}
          <Button
            variant="outline"
            onClick={() => router.push("/chat")}
            size="sm"
          >
            Back to Chat
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-2xl space-y-4">
      <p>Irja, your Creative Copilot</p>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
        REMINISCENCE
        <br />
        <span className="text-primary">RE</span> - IMAGINED.
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Irja is the world&apos;s home for
        <br />
        the <span className="text-primary"> moments that matter</span>.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/chat">
            Enter Irja
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button variant="default" size="lg">
            Get Irja Free
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Heading;

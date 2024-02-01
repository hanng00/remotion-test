"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import HeaderNavbar from "./components/header-navbar";
import SlidesFeed from "./components/slides-feed";
import FooterNavbar from "../../../components/footer-navbar";
import { Spinner } from "@/components/spinner";

const SlidesPage = () => {
  const create = useMutation(api.slides.create);
  const slides = useQuery(api.slides.list);

  const router = useRouter();

  const handleCreateSlide = () => {
    const promise = create().then((slideId) => {
      router.push(`/chat/${slideId}`);
    });
    toast.promise(promise, {
      position: "top-center",
      loading: "Creating slide...",
      success: "Slide created!",
      error: "Failed to create slide.",
    });
  };

  if (slides === undefined) {
    return (
      <div className="w-full h-full">
        <Spinner size="default" />
      </div>
    );
  }

  return (
    <div className="container flex flex-col h-dvh">
      <HeaderNavbar />

      <div className="w-full flex-grow overflow-y-scroll">
        <SlidesFeed slides={slides} />
      </div>

      <FooterNavbar onCreateNew={handleCreateSlide} />
    </div>
  );
};

export default SlidesPage;

import { cn } from "@/lib/utils";
import { CameraIcon } from "lucide-react";
import { useState } from "react";

interface UploadMediaButtonProps {
  uploadMedia: (file: File) => void;
}

const UploadMediaButton = ({ uploadMedia }: UploadMediaButtonProps) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    await onFileChange(e.dataTransfer.files);
  };

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    await onFileChange(e.target.files);
  };

  const onFileChange = async (files: FileList | null) => {
    if (!files) {
      return;
    }

    const promises = [];
    for (const item of files) {
      promises.push(uploadMedia(item));
    }
    await Promise.all(promises);
  };

  return (
    <div
      className={cn(
        "rounded-xl transition duration-300",
        dragOver && "border-dashed border"
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <label htmlFor="fileInput">
        <div
          role="button"
          className="hover:bg-background mx-auto w-fit cursor-pointer flex space-x-2 items-center justify-center px-2 py-1 border rounded-xl"
        >
          <CameraIcon
            size={18}
            className="text-primary/70 pointer-events-none"
          />
          <p
            className="text-md text-primary/70 pointer-events-none"
            draggable="false"
          >
            {dragOver ? "Drop anywhere to Upload" : "Upload"}
          </p>
        </div>
      </label>
      <input
        id="fileInput"
        type="file"
        accept="image/jpeg, image/png, image/gif, image/webp"
        onChange={handleFileInputChange}
        className="hidden"
        multiple
        draggable
      />
    </div>
  );
};

export default UploadMediaButton;

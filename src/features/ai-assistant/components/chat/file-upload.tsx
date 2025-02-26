'use client';

import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onCancel: () => void;
  isUploading?: boolean;
  className?: string;
}

export function FileUpload({
  onFileSelect,
  onCancel,
  isUploading,
  className
}: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 1
  });

  return (
    <div className={cn("relative", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center w-full h-32 px-4",
          "border-2 border-dashed rounded-lg",
          "transition-colors duration-200 ease-in-out cursor-pointer",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          {isDragActive ? (
            <>
              <IconPhoto className="w-8 h-8" />
              <p className="text-sm">Drop the image here</p>
            </>
          ) : (
            <>
              <IconUpload className="w-8 h-8" />
              <p className="text-sm">Drag & drop an image or click to select</p>
              <p className="text-xs">Maximum size: 5MB</p>
            </>
          )}
        </div>
      </div>
      <button
        onClick={onCancel}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted/80"
      >
        <IconX className="w-4 h-4" />
      </button>
    </div>
  );
} 
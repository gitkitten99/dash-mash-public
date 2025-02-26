import { CrossIcon, UploadIcon } from 'lucide-react';
import Image from 'next/image';
import Dropzone, {
  type DropzoneProps,
  type FileRejection
} from 'react-dropzone';
import { toast } from 'sonner';
import React, { memo, lazy, Suspense } from 'react';
import { useControllableState } from '@/hooks/use-controllable-state';
import { cn, formatBytes } from '@/lib/utils';
import './scroll-area.css'; // Import custom styles for the scroll area
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface FileWithPreview extends File {
  preview: string;
}

interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Value of the uploader.
   * @type File[]
   * @default undefined
   * @example value={files}
   */
  value?: File[];

  /**
   * Function to be called when the value changes.
   * @type React.Dispatch<React.SetStateAction<File[]>>
   * @default undefined
   * @example onValueChange={(files) => setFiles(files)}
   */
  onValueChange?: React.Dispatch<React.SetStateAction<File[]>>;

  /**
   * Function to be called when files are uploaded.
   * @type (files: File[]) => Promise<void>
   * @default undefined
   * @example onUpload={(files) => uploadFiles(files)}
   */
  onUpload?: (files: File[]) => Promise<void>;

  /**
   * Progress of the uploaded files.
   * @type Record<string, number> | undefined
   * @default undefined
   * @example progresses={{ "file1.png": 50 }}
   */
  progresses?: Record<string, number>;

  /**
   * Accepted file types for the uploader.
   * @type { [key: string]: string[]}
   * @default
   * ```ts
   * { "image/*": [] }
   * ```
   * @example accept={["image/png", "image/jpeg"]}
   */
  accept?: DropzoneProps['accept'];

  /**
   * Maximum file size for the uploader.
   * @type number | undefined
   * @default 1024 * 1024 * 2 // 2MB
   * @example maxSize={1024 * 1024 * 2} // 2MB
   */
  maxSize?: DropzoneProps['maxSize'];

  /**
   * Maximum number of files for the uploader.
   * @type number | undefined
   * @default 1
   * @example maxFiles={5}
   */
  maxFiles?: DropzoneProps['maxFiles'];

  /**
   * Whether the uploader should accept multiple files.
   * @type boolean
   * @default false
   * @example multiple
   */
  multiple?: boolean;

  /**
   * Whether the uploader is disabled.
   * @type boolean
   * @default false
   * @example disabled
   */
  disabled?: boolean;
}

// Memoize the FileUploader component to prevent unnecessary re-renders
const FileUploader = lazy(() => import('./file-uploader'));

const FileUploaderComponent = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FileUploader />
    </Suspense>
  );
};

export default FileUploaderComponent;

interface FileCardProps {
  file: FileWithPreview;
  onRemove: () => void;
  progress?: number;
}

function FileCard({ file, progress, onRemove }: FileCardProps) {
  return (
    <div className="file-card">
      <span>{file.name}</span>
      {file.preview && <Image src={file.preview} alt={file.name} width={100} height={100} priority />}
      {progress && <Progress value={progress} />}
      <Button onClick={onRemove} variant="destructive">Remove</Button>
    </div>
  );
}

function isFileWithPreview(file: File): file is FileWithPreview {
  return 'preview' in file && typeof file.preview === 'string';
}

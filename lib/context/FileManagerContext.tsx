import type { Dispatch } from "react";
import { createContext, useContext } from "react";
import type { FileSystemType } from "../types";

interface ProviderInterface {
  fs: FileSystemType;
  currentFolder: string;
  setCurrentFolder: (id: string) => void;
  viewOnly?: boolean;
  onRefresh?: (id: string) => Promise<void>;
  onUpload?: (fileData: any, folderId: string) => Promise<void>;
  onCreateFolder?: (folderName: string) => Promise<void>;
  onDelete?: (fileId: string) => Promise<void>;
  uploadedFileData: any;
  setUploadedFileData: Dispatch<any>;
}

export const FileManagerContext = createContext<ProviderInterface | null>(null);

export const useFileManager = () => {
  const context = useContext(FileManagerContext);
  if (!context) {
    throw new Error("useFileManager must be used within FileManagerProvider");
  }
  return context;
};

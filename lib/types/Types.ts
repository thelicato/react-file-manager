// Be careful: even a folder is a file!
export type FileType = {
  id: string; // Unique ID given to this file
  name: string;
  isDir: boolean;
  path?: string; // Optional because files inherit the path from the parentId folder
  parentId?: string; // Optional because the root folder does not have a parent
  lastModified?: number
};

export type FileSystemType = FileType[];

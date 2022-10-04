import React, { useState } from 'react';
// Context
import { FileManagerContext } from "./context";
// Components
import { Navbar, Workspace } from './components';
// Types
import { FileSystemType } from './types';
// Styles
import "./tailwind.css";

export interface IFileManagerProps {
    fs: FileSystemType,
    onRefresh?: (id: string) => Promise<void>,
    onUpload?: (fileData: any, folderId: string) => Promise<void>,
    onCreateFolder?: (folderName: string) => Promise<void>,
    onDelete?: (fileId: string) => Promise<void>,
}


export const ReactFileManager = ({fs, onRefresh, onUpload, onCreateFolder, onDelete}: IFileManagerProps) => {
    const [currentFolder, setCurrentFolder] = useState<string>("0"); // Root folder ID must be "0"
    const [uploadedFileData, setUploadedFileData] = useState<any>();

    return (
        <FileManagerContext.Provider value={{
            fs: fs,
            currentFolder: currentFolder,
            setCurrentFolder: setCurrentFolder,
            onRefresh: onRefresh,
            onUpload: onUpload,
            onCreateFolder: onCreateFolder, 
            onDelete: onDelete,
            uploadedFileData: uploadedFileData,
            setUploadedFileData: setUploadedFileData
        }}>
            <div className="rfm-main-container">
                <Navbar />
                <Workspace />
            </div>
        </FileManagerContext.Provider>
    )
};
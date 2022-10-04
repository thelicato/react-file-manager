import React, { useMemo } from 'react';
// Context
import { useFileManager } from '../context';
// Types
import { FileType } from '../types';
// Components
import SvgIcon from './SvgIcon';

const FolderPath = () => {
    const { fs, currentFolder, setCurrentFolder } = useFileManager();

    const goUp = () => {
        const currentFolderInfo = fs.find((f: FileType) => f.id === currentFolder);
        if (currentFolderInfo && currentFolderInfo.parentId) {
            setCurrentFolder(currentFolderInfo.parentId);
        }
    }

    const parentPath = useMemo((): string => {
        const parentId: string | undefined = fs.find((f: FileType) => f.id === currentFolder)?.parentId;
        if (!parentId) {
            return ""
        } 
        const parentDir = fs.find((f: FileType) => f.id === parentId);
        if (!parentDir?.path) {
            return ""
        }

        const _parentPath = parentDir.path.slice(-1) === "/" ? parentDir.path : `${parentDir.path}/`;
        return _parentPath;
    }, [fs, currentFolder])

    const currentPath = useMemo((): string => {
        const currentFolderInfo = fs.find((f: FileType) => f.id === currentFolder);
        return currentFolderInfo ? currentFolderInfo.name : "";
    }, [fs, currentFolder])

    return (
        <div className="rfm-folder-path-container">
            <SvgIcon 
            svgType="arrow-up"
            onClick={goUp}
            className="rfm-folder-path-svg"/>
            <span className="rfm-folder-path-span">
                {parentPath}<b>{currentPath}</b>
            </span>
        </div>
    )
};

export default FolderPath;
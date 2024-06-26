import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFileManager } from "../context";
import type { FileType } from "../types";
import { ViewStyle } from "../types";

// Components
import FileIcon from "./FileIcon";
import NewFolderIcon from "./NewFolderIcon";
import FolderPath from "./FolderPath";
import NewFolderModal from "./NewFolderModal";
import UploadFileModal from "./UploadFileModal";


import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import SvgIcon from "./SvgIcon";


const columnHelper = createColumnHelper<FileType>()

const columns = [
  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: info => (
    <div className="rfm-workspace-list-icon-td">
      <SvgIcon svgType={info.row.original.isDir ? "folder" : "file"} className="rfm-workspace-list-icon"/>
      <p>{info.getValue()}</p>
    </div>
    ),
  }),
  columnHelper.accessor('lastModified', {
    header: () => 'Last Modified',
    cell: info => info.getValue() ? new Date((info.getValue() as number) * 1000).toLocaleString() : 'N/A',
  }),
]

const Workspace = () => {
  const { currentFolder, fs, viewStyle, viewOnly, setCurrentFolder, setUploadedFileData, onDoubleClick, onRefresh } = useFileManager();
  const [newFolderModalVisible, setNewFolderModalVisible] =
    useState<boolean>(false);
  const [uploadFileModalVisible, setUploadFileModalVisible] =
    useState<boolean>(false);

  const setUploadModalVisible = (value: boolean) => {
    if (viewOnly) {
      setUploadFileModalVisible(false);
    } else {
      setUploadFileModalVisible(value);
    }
  };

  useEffect(() => {
    if (newFolderModalVisible) {
      setNewFolderModalVisible(false);
    }
    if (uploadFileModalVisible) {
      setUploadModalVisible(false);
      setUploadedFileData(undefined);
    }
  }, [currentFolder]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setUploadedFileData(file);
      setUploadModalVisible(true);
    },
    [setUploadedFileData]
  );

  const onCloseUploadFileModal = () => {
    setUploadModalVisible(false);
    setUploadedFileData(undefined);
  };

  const { getRootProps, isDragAccept } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop: onDrop,
  });

  const currentFolderFiles = useMemo(() => {
    const files = fs.filter((f: FileType) => f.parentId === currentFolder);
    return files;
  }, [fs, currentFolder]);

  const table = useReactTable({data: currentFolderFiles, columns, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [{ id: 'name', desc: false }],
    },})

  const handleClick = async (file: FileType) => {

    if (file.isDir) {
      setCurrentFolder(file.id);
      if (onRefresh !== undefined) {
        try {
          await onRefresh(file.id);
        } catch (e) {
          throw new Error("Error during refresh");
        }
      }
    }
    
  };

  const handleDoubleClick = (id: string) => {
    if (onDoubleClick) {
      onDoubleClick(id)
    }
  }

  return (
    <section
      id="react-file-manager-workspace"
      className={`rfm-workspace ${
        isDragAccept && !viewOnly ? "rfm-workspace-dropzone" : ""
      }`}
      {...getRootProps()}
    >
      {/* Top bar with folder path */}
      <FolderPath />

      {/* File listing */}
      <div className="rfm-workspace-file-listing">
        
        {/* Icons File View */}
        {viewStyle === ViewStyle.Icons && (
          <>
          {currentFolderFiles.map((f: FileType, key: number) => {
            return (
              <button onDoubleClick={() => handleDoubleClick(f.id)} key={key}>
                <FileIcon id={f.id} name={f.name} isDir={f.isDir}/>
              </button>
            )}
          )}
          {!viewOnly && (
            <NewFolderIcon onClick={() => setNewFolderModalVisible(true)} />
          )}
          </>
        )}

        {/* List File View */}
        {viewStyle === ViewStyle.List && (
        <>
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th className="rfm-workspace-list-th" key={header.id} onClick={header.column.getToggleSortingHandler()}>
                      <div className="rfm-workspace-list-th-content">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() ? (header.column.getIsSorted() === 'desc' ? <SvgIcon svgType="arrow-down" className="rfm-header-sort-icon" /> : <SvgIcon svgType="arrow-up" className="rfm-header-sort-icon" />) : ''}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="rfm-workspace-list-icon-row">
                  {row.getVisibleCells().map(cell => (
                    <td className="rfm-workspace-list-align-txt" key={cell.id} onClick={() => handleClick(row.original)} onDoubleClick={() => handleDoubleClick(row.original.id)}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {!viewOnly && (
            <button className="rfm-workspace-list-add-folder" onClick={() => setNewFolderModalVisible(true)}>Add Folder</button>
          )}
        </>
        )}    


        {!viewOnly && (
          <>
            <NewFolderModal
              isVisible={newFolderModalVisible}
              onClose={() => setNewFolderModalVisible(false)}
            />
            <UploadFileModal
              isVisible={uploadFileModalVisible}
              onClose={onCloseUploadFileModal}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Workspace;

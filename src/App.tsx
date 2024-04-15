import React from "react";
import type { FileSystemType } from "../lib";
import { ReactFileManager } from "../lib";
import "./App.css";

export const dummyFileSystem: FileSystemType = [
  { id: "0", name: "/", path: "/", isDir: true },
  {
    id: "31258",
    name: "report.pdf",
    isDir: false,
    parentId: "0",
  },
  {
    id: "31259",
    name: "Documents",
    isDir: true,
    parentId: "0",
    path: "/Documents",
  },
  {
    id: "31261",
    name: "Personal",
    isDir: true,
    parentId: "31259",
    path: "/Documents/Personal",
  },
  {
    id: "31260",
    name: "report.docx",
    isDir: false,
    parentId: "0",
  },
  {
    id: "31267",
    name: "Images",
    isDir: true,
    parentId: "0",
    path: "/Images",
  },
  {
    id: "31260",
    name: "logo.png",
    isDir: false,
    parentId: "31267",
  },
];

function App() {
  return (
    <div className="container">
      <ReactFileManager fs={dummyFileSystem} />
    </div>
  );
}

export default App;

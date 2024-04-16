import React, { useMemo } from "react";
import { useFileManager } from "../context";
import type { FileType } from "../types";

const Navbar = () => {
  const { fs, setCurrentFolder, onRefresh } = useFileManager();

  const initialFolders = useMemo(() => {
    return fs.filter((f: FileType) => f.isDir && f.parentId === "0");
  }, [fs]);

  const handleClick = async (id: string) => {
    setCurrentFolder(id);
    if (onRefresh !== undefined) {
      try {
        await onRefresh(id);
      } catch (e) {
        throw new Error("Error during refresh");
      }
    }
  };

  return (
    <section className="rfm-navbar">
      <span
        onClick={() => setCurrentFolder("0")}
        className="rfm-navbar-root-link"
      >
        Root
      </span>

      <ul className="rfm-navbar-list">
        {initialFolders.map((f: FileType) => {
          return (
            <li
              onClick={() => handleClick(f.id)}
              className="rfm-navbar-list-element"
              key={f.id}
            >
              {f.name}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Navbar;

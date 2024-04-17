import React, { useEffect } from "react";
import type { FileSystemType } from "../lib";
import { ReactFileManager } from "../lib";
import "./App.css";
import "../lib/tailwind.css";

export const dummyFileSystem: FileSystemType = [
  { id: "0", name: "/", path: "/", isDir: true },
  {
    id: "31258",
    name: "report.pdf",
    isDir: false,
    parentId: "0",
    lastModified: 1677021347
  },
  {
    id: "31259",
    name: "Documents",
    isDir: true,
    parentId: "0",
    path: "/Documents",
    lastModified: 1704720512
  },
  {
    id: "31261",
    name: "Personal",
    isDir: true,
    parentId: "31259",
    path: "/Documents/Personal",
    lastModified: 1686630289
  },
  {
    id: "31260",
    name: "report.docx",
    isDir: false,
    parentId: "0",
    lastModified: 1679647141
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

enum Theme {
  Dark = 'dark',
  Light = 'light',
}

const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-theme');

    if (typeof storedPrefs === 'string') {
      return storedPrefs as Theme;
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) {
      return Theme.Dark;
    }
  }

  return Theme.Light; // light theme as the default;
};


function App() {
  const [theme, setTheme] = React.useState<Theme>(getInitialTheme);

  const rawSetTheme = (rawTheme: Theme) => {
    const root = window.document.documentElement;
    const isDark = rawTheme === Theme.Dark;

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(rawTheme);

    localStorage.setItem('color-theme', rawTheme);
  };

  const toggleTheme = () => {
    const _theme: Theme = theme === Theme.Dark ? Theme.Light : Theme.Dark;
    setTheme(_theme);
  };

  useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);


  return (
    <>
    <button className="switch-mode-btn" onClick={toggleTheme}>Switch mode</button>
    <div className="container">
      <ReactFileManager fs={dummyFileSystem} />
    </div>
    </>
  );
}

export default App;

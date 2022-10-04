import 'react-app-polyfill/ie11';
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import { ReactFileManager, FileSystemType } from '../.';
import "./index.css"

export const dummyFileSystem: FileSystemType = [
  { id: '0', name: '/', path: '/', isDir: true },
  {
    id: '31258',
    name: 'report.pdf',
    isDir: false,
    parentId: '0'
  },
  {
    id: '31259',
    name: 'Documents',
    isDir: true,
    parentId: '0',
    path: '/Documents'
  },
  {
    id: '31261',
    name: 'Personal',
    isDir: true,
    parentId: '31259',
    path: '/Documents/Personal'
  },
  {
    id: '31260',
    name: 'report.docx',
    isDir: false,
    parentId: '0'
  },
  {
    id: '31267',
    name: 'Images',
    isDir: true,
    parentId: '0',
    path: '/Images'
  },
  {
    id: '31260',
    name: 'logo.png',
    isDir: false,
    parentId: '31267'
  },
]

const App = () => {
  return (
    <div className="container">
      <ReactFileManager fs={dummyFileSystem}/>
    </div>
  );
};

createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)
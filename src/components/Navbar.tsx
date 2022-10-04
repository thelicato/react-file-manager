import React, { useMemo } from 'react';
import { useFileManager } from '../context';
import {  FileType } from '../types';

const Navbar = () => {
    const {fs, setCurrentFolder} = useFileManager();


    const initialFolders = useMemo(() => {
        return fs.filter((f: FileType) => f.isDir && f.parentId === '0');
    }, [fs])

    return (
        <section className="rfm-navbar">
            <span
            onClick={() => setCurrentFolder("0")}
            className="rfm-navbar-root-link">
                Root
            </span>

            <ul className="rfm-navbar-list">
                {initialFolders.map((f: FileType) => {
                    return (
                        <li 
                        onClick={() => setCurrentFolder(f.id)}
                        className="rfm-navbar-list-element" key={f.id}>
                            {f.name}
                        </li>
                    )
                })}
            </ul>
        </section>
    )
};

export default Navbar;
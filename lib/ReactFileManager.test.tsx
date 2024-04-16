import * as React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import type { FileSystemType } from ".";
import { ReactFileManager } from ".";

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
];

describe("it", () => {
  it("renders without crashing", async () => {
    const result = render(<ReactFileManager fs={dummyFileSystem} />);
    const workspace = result.container.querySelector(
      "#react-file-manager-workspace"
    );
    expect(workspace).not.toBeNull();
  });
});

import { Meta } from "@storybook/react";
import type { StoryObj } from "@storybook/react";
import { ReactFileManager } from "../../lib";
// Dummy data
import { dummyFileSystem } from "../App";
// Styles
import "../../lib/tailwind.css";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Example/ReactFileManager",
  component: ReactFileManager,
} satisfies Meta<typeof ReactFileManager>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Base: Story = {
  args: {
    fs: dummyFileSystem,
  },
};

export const ViewOnly: Story = {
  args: {
    fs: dummyFileSystem,
    viewOnly: true,
  },
};

export const DoubleClickAlert: Story = {
  args: {
    fs: dummyFileSystem,
    viewOnly: true,
    onDoubleClick: async (id: string) => {
        alert(`Hello ${id}!`)
    },
  },
};

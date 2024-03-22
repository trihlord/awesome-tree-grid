import type { Meta, StoryObj } from "@storybook/react";
import { TreeGrid } from "./TreeGrid";

const meta: Meta<typeof TreeGrid> = {
  component: TreeGrid,
};

export default meta;

type Story = StoryObj<typeof TreeGrid>;

export const Basic: Story = {};

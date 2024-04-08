import type { Meta, StoryObj } from "@storybook/react";
import { TreeGrid, type TreeGridColumn, type TreeGridRow } from "./TreeGrid";

const meta: Meta<typeof TreeGrid> = {
  component: TreeGrid,
};

export default meta;

type Story = StoryObj<typeof TreeGrid>;

export const Basic: Story = {};

export const Countries: Story = {
  render: function () {
    type Country = { id: number; name: string; postcode: number };
    const countries: Country[] = [{ id: 0, name: "Russia", postcode: 117 }];
    const columns: TreeGridColumn<Country>[] = [
      { key: "name", title: "Name", render: "name" },
      { key: "postcode", title: "Post Code", render: "postcode" },
    ];
    const row: TreeGridRow<Country> = { key: "id" };
    return <TreeGrid columns={columns} data={countries} row={row} />;
  },
};

import type { CSSProperties, Key, ReactNode } from "react";

export type TreeGridRender<T> =
  | ((data: T) => ReactNode)
  | { [x in keyof T]: T[x] extends ReactNode ? x : never }[keyof T];

export interface TreeGridDataProps<T> {
  data: T;
  render?: TreeGridRender<T>;
}

export function TreeGridData<T extends object>({
  data,
  render,
}: TreeGridDataProps<T>) {
  if (!render) {
    return null;
  }
  if (typeof render === "function") {
    return render(data);
  }
  if (render in data) {
    return data[render];
  }
  return null;
}

export interface TreeGridColumn<T> {
  key: Key;
  title?: ReactNode;
  width?: CSSProperties["width"];
  render?: TreeGridRender<T>;
}

export interface TreeGridRow<T> {
  key: { [x in keyof T]: T[x] extends Key ? x : never }[keyof T];
}

export interface TreeGridProps<T> {
  columns?: TreeGridColumn<T>[];
  data?: T[];
  row: TreeGridRow<T>;
}

export function TreeGrid<T extends object>({
  columns = [],
  data = [],
  row,
}: TreeGridProps<T>) {
  return (
    <table role="treegrid">
      <colgroup>
        {columns.map(function ({ key, width }) {
          return <col key={key} style={{ width }} />;
        })}
      </colgroup>
      <thead>
        <tr>
          {columns.map(function ({ key, title }) {
            return (
              <th key={key} scope="col">
                {title}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map(function (data) {
          const key = data[row.key] as Key;
          return (
            <tr key={key}>
              {columns.map(function ({ key, render }) {
                return (
                  <td key={key} role="gridcell">
                    <TreeGridData data={data} render={render} />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

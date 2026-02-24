"use client";

import { ReactNode } from "react";

interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyState?: ReactNode;
}

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  emptyState,
}: DataTableProps<T>) {
  if (data.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-navy-600/50">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-navy-600/50 bg-navy-800/30">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left font-medium text-gray-400 font-display text-xs uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-700/30">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-navy-800/20 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-gray-300">
                  {col.render ? col.render(row) : (row[col.key] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

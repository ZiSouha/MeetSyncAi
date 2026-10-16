"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,

  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  onRowClick?: (row: TData) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl shadow-2xl">
      <Table>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                onClick={() => onRowClick?.(row.original)}
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="cursor-pointer group/row transition-all duration-300 hover:bg-white/[0.04] border-white/[0.05]"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-sm py-6 px-6 font-medium text-zinc-300 group-hover/row:text-white transition-colors">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-zinc-500 font-medium">
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
"use client";

import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/components/ui/table";
import { Button } from "@/Components/components/ui/button";
import { flexRender } from "@tanstack/react-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/components/ui/select";
import { Input } from "@/Components/components/ui/input"; // Import Input for filtering

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);

  // Filter out the `sr` column from the filters
  const filteredColumns = columns.filter(
    (column) => column.accessorKey !== "sr" && column.accessorKey !== "shift"
  );
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      sorting: [],
      pagination: { pageSize: 10 },
      columnFilters: [],
    },
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="rounded-md border overflow-x-auto bg-white shadow-lg ">
  {/* Filtering Section */}
  <div className="flex justify-center items-center pt-4 space-x-4 mb-10">
    <div className="text-gray-600 font-sans tracking-widest font-bold">Filters:</div>
    {filteredColumns.map((column) => (
      column.accessorKey && (
        <div key={column.accessorKey} className="flex items-center">
          <Input
            placeholder={`Filter by ${column.header instanceof Function 
              ? column.header({ column }).props.children[0] 
              : column.header || column.accessorKey}`}
            value={(table.getColumn(column.accessorKey)?.getFilterValue() || "")}
            onChange={(e) =>
              table.getColumn(column.accessorKey)?.setFilterValue(e.target.value)
            }
            className="max-w-xs"
          />
        </div>
      )
    ))}
  </div>

      {/* Table */}
      <Table className="min-w-full table-auto">
        {/* Table Header */}
        <TableHeader className="bg-[#222831] text-left">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className=" py-2 font-semibold tracking-wide text-white"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row,index) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-t `}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-6  text-sm text-gray-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-gray-500"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between py-4 px-4 space-y-2 sm:space-y-0">
        {/* Rows Per Page Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 text-sm">Show</span>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="w-24 text-sm">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-gray-600 text-sm">results</span>
        </div>

        {/* Pagination Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>

        {/* Page Info */}
        <div className="text-gray-600 text-sm">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
      </div>
    </div>
  );
}

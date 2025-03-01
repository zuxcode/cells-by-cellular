import { Table } from "@tanstack/react-table";
import { ColumnSchema } from "../components/column";

const generatePageNumbers = (table: Table<ColumnSchema>) => {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const pages = [];
  const range = 1; // Number of pages to show around current

  // Always show first page
  pages.push(1);

  // Show dynamic range with ellipsis
  let start = Math.max(2, currentPage - range);
  let end = Math.min(totalPages - 1, currentPage + range);

  if (currentPage - range > 2) pages.push(-1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (currentPage + range < totalPages - 1) pages.push(-1);

  // Always show last page if different from first
  if (totalPages > 1) pages.push(totalPages);

  // Dedupe and filter
  return pages.filter((v, i, a) => a.indexOf(v) === i && v !== 0);
};

export { generatePageNumbers };

import { Table } from "@tanstack/react-table";
import { ColumnSchema } from "./column";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { generatePageNumbers } from "../utils/generate-page-number";
import { ChevronLeft, ChevronRight } from "lucide-react";

function TablePagination({
  table,
}: {
  table: Table<ColumnSchema>;
}) {
  return (
    <div className="flex justify-center">
    <Breadcrumb>
      <BreadcrumbList className="flex-wrap justify-center gap-2">
        <BreadcrumbItem>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
        </BreadcrumbItem>

        {generatePageNumbers(table).map((page, index) => (
          <BreadcrumbItem key={index}>
            {page === -1 ? (
              <BreadcrumbSeparator />
            ) : (
              <BreadcrumbLink
                className={`h-8 w-8 p-0 flex items-center justify-center rounded-md ${
                  table.getState().pagination.pageIndex + 1 === page
                    ? "bg-primary text-primary-foreground font-bold"
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => table.setPageIndex(page - 1)}
              >
                {page}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ))}

        <BreadcrumbItem>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
  );
}

export { TablePagination };

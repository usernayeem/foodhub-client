"use client";

import * as React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardTableProps {
    title: string;
    data: any[];
    columns: {
        header: string;
        accessorKey: string;
        render?: (item: any) => React.ReactNode;
    }[];
    pageSize?: number;
    searchKey?: string;
}

export function DashboardTable({
    title,
    data,
    columns,
    pageSize = 5,
    searchKey,
}: DashboardTableProps) {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [currentPage, setCurrentPage] = React.useState(1);

    const filteredData = React.useMemo(() => {
        if (!searchTerm || !searchKey) return data;
        return data.filter((item) =>
            String(item[searchKey])
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
    }, [data, searchTerm, searchKey]);

    const totalPages = Math.ceil(filteredData.length / pageSize);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xl font-bold">{title}</CardTitle>
                {searchKey && (
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={`Search ${searchKey}...`}
                            className="pl-8 bg-background/50 border-border/50 focus:border-primary/50"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                )}
            </CardHeader>
            <CardContent>
                <div className="rounded-md border border-border/50 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-muted/30">
                            <TableRow>
                                {columns.map((column, i) => (
                                    <TableHead key={i}>{column.header}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((item, rowIndex) => (
                                    <TableRow key={rowIndex} className="hover:bg-muted/20 transition-colors">
                                        {columns.map((column, colIndex) => (
                                            <TableCell key={colIndex}>
                                                {column.render
                                                    ? column.render(item)
                                                    : item[column.accessorKey]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                {totalPages > 1 && (
                    <div className="flex items-center justify-end space-x-2 pt-4">
                        <div className="text-sm text-muted-foreground flex-1">
                            Showing {Math.min(filteredData.length, (currentPage - 1) * pageSize + 1)} to {Math.min(filteredData.length, currentPage * pageSize)} of {filteredData.length} entries
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="h-8 w-8 p-0"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center justify-center text-sm font-medium">
                            Page {currentPage} of {totalPages}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="h-8 w-8 p-0"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

'use client';

import { removeSearchParam, addOrUpdateParam } from '@/app/params';

import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    initial: number;
    count: number;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    initial = 1,
    count,
}: DataTableProps<TData, TValue>) {
    useEffect(() => {
        console.log(count / 10);
        if (data.length === 0 && count !== 0) {
            addOrUpdateParam('page', String(Math.floor(count / 10)));
        }
    }, [count, data]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pageIndex, setPageIndex] = React.useState(initial - 1);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
        initialState: {
            pagination: {
                pageIndex: 0,
            },
        },
    });
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    useEffect(() => {
        const page = Number(searchParams.get('page')) || 1;
        if (page === 1) {
            removeSearchParam('page', pathname, router);
        }
        setPageIndex(page - 1);
    }, [searchParams, table, pathname, router]);

    return (
        <div>
            <div className='rounded-md border'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className='text-center'>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            id={cell.id}
                                            className={cn(
                                                'text-center',
                                                cell.id.includes('action')
                                                    ? 'min-w-[1rem]'
                                                    : cell.id.includes('id')
                                                      ? 'sr-only'
                                                      : 'min-w-[12.5rem]',
                                            )}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className='h-24 text-center'>
                                    Страница пустая
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className='flex items-center justify-end space-x-2 py-4'>
                <Button
                    variant='outline'
                    size='sm'
                    onClick={() => {
                        if (pageIndex === 1) {
                            removeSearchParam('page', pathname, router);
                        } else {
                            addOrUpdateParam('page', String(pageIndex));
                        }
                    }}
                    disabled={
                        Number(searchParams.get('page') ?? 1) <= 1
                            ? true
                            : false
                    }>
                    Назад
                </Button>
                <Button
                    variant='outline'
                    size='sm'
                    onClick={() => {
                        addOrUpdateParam('page', String(pageIndex + 2));
                    }}
                    disabled={
                        Number(searchParams.get('page') ?? 1) * 10 >= count
                            ? true
                            : false
                    }>
                    Вперёд
                </Button>
            </div>
        </div>
    );
}

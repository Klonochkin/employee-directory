'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { removeSearchParam, addOrUpdateParam } from '@/app/params';
import { ArrowUpDown } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export type Employees = {
    last_name: string;
    first_name: string;
    father_name: string;
    bday: Date;
    position: string;
    phone_number: string;
};

function ToggleSort() {
    const [sort, setSort] = useState(0);
    const sortValue = ['desc', 'asc', 'none'];
    const router = useRouter();
    const pathname = usePathname();
    return (
        <Button
            variant='ghost'
            onClick={() => {
                sort === 2
                    ? removeSearchParam('sort', pathname, router)
                    : addOrUpdateParam(
                          'sort',
                          sortValue[sort],
                          pathname,
                          router,
                      );
                setSort((prev) => (prev + 1 >= 3 ? 0 : prev + 1));
            }}>
            День рождения
            <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
    );
}

export const columns: ColumnDef<Employees, unknown>[] = [
    {
        accessorKey: 'last_name',
        header: 'Фамилия',
    },
    {
        accessorKey: 'first_name',
        header: 'Имя',
    },
    {
        accessorKey: 'father_name',
        header: 'Отчество',
    },
    {
        accessorKey: 'bday',
        header: () => <ToggleSort></ToggleSort>,
        cell: (info) =>
            new Date(String(info.getValue())).toISOString().split('T')[0],
    },
    {
        accessorKey: 'position',
        header: 'Должность',
    },
    {
        accessorKey: 'phone_number',
        header: 'Номер телефона',
    },
];

'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DropdownMenuRadioGroupDemo } from '../dropdown-sortmenu';
import { Employees } from '@/app/db/schema';

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
        header: () => <DropdownMenuRadioGroupDemo></DropdownMenuRadioGroupDemo>,
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

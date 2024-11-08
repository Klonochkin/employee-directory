'use client';

import { CellContext, ColumnDef } from '@tanstack/react-table';
import { DropdownMenuRadioGroupDemo } from '../dropdown-sortmenu';
import { Employees } from '@/app/db/schema';

function convertDate(info: CellContext<Employees, unknown>) {
    const months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ];
    const date = new Date(String(info.getValue()));
    const result =
        date.getDate() +
        ' ' +
        months[date.getMonth()] +
        ' ' +
        date.getFullYear();
    return result;
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
        header: () => <DropdownMenuRadioGroupDemo></DropdownMenuRadioGroupDemo>,
        cell: (info) => convertDate(info),
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

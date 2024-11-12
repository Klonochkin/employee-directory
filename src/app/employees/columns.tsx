'use client';

import { ColumnDef, Row } from '@tanstack/react-table';
import { DropdownMenuRadioGroupDemo } from '../dropdown-sortmenu';
import { Employees } from '@/app/db/schema';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { addOrUpdateParam } from '../params';
import { useState } from 'react';
import { convertDateToText } from '../convert-date';

function DropMenu({
    row,
}: {
    row: Row<{
        id: number;
        last_name: string;
        first_name: string;
        father_name: string;
        bday: string;
        position: string;
        phone_number: string;
    }>;
}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <DropdownMenu
            onOpenChange={() => {
                setIsOpen((prev) => !prev);
            }}
            open={isOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    onClick={() => {
                        setIsOpen((prev) => !prev);
                    }}
                    id='dropDownButton'
                    variant='ghost'
                    className='size-8 p-0'>
                    <span className='sr-only'>Open menu</span>
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem
                    onClick={() => {
                        const buttonDialog = document.getElementById(
                            'buttonDialog',
                        ) as HTMLButtonElement;
                        buttonDialog.click();
                        addOrUpdateParam('selected', String(row.id));
                    }}>
                    <Pencil />
                    Редактировать
                </DropdownMenuItem>
                <DropdownMenuItem
                    className='bg-[#7c1515]'
                    onClick={() => {
                        const form: HTMLFormElement | null =
                            document.querySelector('form');
                        const nameInput = 'input_id';
                        const input = document.getElementById(
                            nameInput,
                        ) as HTMLInputElement;
                        if (input && row.getValue('id')) {
                            input.value = row.getValue('id');
                        }
                        form?.submit();
                    }}>
                    <Trash2 />
                    Удалить
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
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
        header: () => <DropdownMenuRadioGroupDemo></DropdownMenuRadioGroupDemo>,
        cell: (info) => convertDateToText(String(info.getValue())),
    },
    {
        accessorKey: 'position',
        header: 'Должность',
    },
    {
        accessorKey: 'phone_number',
        header: 'Номер телефона',
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            return <DropMenu row={row} />;
        },
    },
    {
        accessorKey: 'id',
        header: '',
    },
];

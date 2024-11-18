'use client';
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { Context } from './context';

export function AddEmployee() {
    const context = useContext(Context);
    const { setIsOpenDialogAdd } = context;
    return (
        <Button
            variant='ghost'
            onClick={() => {
                setIsOpenDialogAdd((prev) => !prev);
            }}>
            Добавить сотрудника
        </Button>
    );
}

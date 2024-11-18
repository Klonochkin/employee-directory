'use client';
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { Context } from './context';
import { addOrUpdateParam } from './params';

export function AddEmployee() {
    const context = useContext(Context);
    const { isOpenDialogAdd, setIsOpenDialogAdd } = context;
    return (
        <Button
            variant='ghost'
            onClick={() => {
                setIsOpenDialogAdd((prev) => !prev);
                addOrUpdateParam('open', String(!isOpenDialogAdd));
            }}>
            Добавить сотрудника
        </Button>
    );
}

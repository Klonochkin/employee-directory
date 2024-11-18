'use client';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useContext } from 'react';
import { Context } from './context';
import { AddEmployeeForm } from './add-employee-form';

export function AddEmployeeDialog() {
    const context = useContext(Context);
    const { isOpenDialogAdd, setIsOpenDialogAdd } = context;

    const handleDialogClose = (open: boolean) => {
        if (!open) {
            setIsOpenDialogAdd((prev) => !prev);
        }
    };

    return (
        <Dialog open={isOpenDialogAdd} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
                <Button id='buttonDialog' variant='outline' className='sr-only'>
                    Add employee
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Добавление сотрудника</DialogTitle>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                    <AddEmployeeForm />
                </div>
                <DialogFooter className='sm:justify-start'>
                    <DialogClose asChild>
                        <Button
                            id='dialog-close'
                            type='button'
                            className='sr-only'>
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

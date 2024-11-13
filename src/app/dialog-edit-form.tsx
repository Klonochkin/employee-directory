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
import { EditForm } from './edit-form';
import { removeSearchParam } from './params';
import { usePathname, useRouter } from 'next/navigation';
import { useContext } from 'react';
import { Context } from './context';
import { Employees } from './db/schema';

export function EditDialog({ data }: { data: Employees[] }) {
    const context = useContext(Context);
    const { isOpenDialog, setIsOpenDialog } = context;
    const router = useRouter();
    const pathname = usePathname();

    const handleDialogClose = (open: boolean) => {
        if (!open) {
            removeSearchParam('selected', pathname, router);
            setIsOpenDialog((prev) => !prev);
        }
    };

    return (
        <Dialog open={isOpenDialog} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
                <Button id='buttonDialog' variant='outline' className='sr-only'>
                    Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Редактирование</DialogTitle>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                    <EditForm data={data} />
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

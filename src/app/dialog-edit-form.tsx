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

export function DialogDemo() {
    const router = useRouter();
    const pathname = usePathname();

    const handleDialogClose = (open: boolean) => {
        if (!open) {
            removeSearchParam('selected', pathname, router);
        }
    };

    return (
        <Dialog onOpenChange={handleDialogClose}>
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
                    <EditForm />
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

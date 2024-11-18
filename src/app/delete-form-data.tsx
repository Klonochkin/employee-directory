'use client';

import { usePathname, useRouter } from 'next/navigation';
import { deleteSomething } from './server-actions';
import { removeSearchParam } from './params';

export const DeleteForm = () => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <form
            id='form'
            action={deleteSomething}
            onSubmit={() => {
                removeSearchParam('open', pathname, router);
            }}
            className='inline-block'>
            <input type='hidden' name='id' id='input_id' />
        </form>
    );
};

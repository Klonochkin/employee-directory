'use client';

import { FormEvent } from 'react';
import { deleteSomething } from './delete-data';

export const ConfirmV2 = () => {
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        if (!confirm('Are you sure?')) {
            e.preventDefault();
            console.log(e);
        }
    };

    return (
        <form
            id='form'
            action={deleteSomething}
            onSubmit={onSubmit}
            className='inline-block'>
            <input type='hidden' name='id' id='input_id' />
        </form>
    );
};

'use client';

import { deleteSomething } from './delete-data';

export const DeleteForm = () => {
    return (
        <form id='form' action={deleteSomething} className='inline-block'>
            <input type='hidden' name='id' id='input_id' />
        </form>
    );
};

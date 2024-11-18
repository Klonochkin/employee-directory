'use client';

import { deleteSomething } from './server-actions';

export const DeleteForm = () => {
    return (
        <form id='form' action={deleteSomething} className='inline-block'>
            <input type='hidden' name='id' id='input_id' />
        </form>
    );
};

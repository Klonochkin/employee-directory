'use server';

import { revalidatePath } from 'next/cache';
import { addEmployee, updateData, deleteData } from './postgresDb';

export async function addSomething(params: FormData) {
    await addEmployee(params.get('bday') as string, {
        last_name: params.get('last_name') as string,
        first_name: params.get('first_name') as string,
        father_name: params.get('father_name') as string,
        position: params.get('position') as string,
        phone_number: params.get('phone_number') as string,
    });
    revalidatePath('/');
    return;
}

export async function deleteSomething(params: FormData) {
    await deleteData(Number(params.get('id')));
    revalidatePath('/');
}

export async function editSomething(params: FormData) {
    await updateData(params.get('bday') as string, Number(params.get('id')), {
        last_name: params.get('last_name') as string,
        first_name: params.get('first_name') as string,
        father_name: params.get('father_name') as string,
        position: params.get('position') as string,
        phone_number: params.get('phone_number') as string,
    });
    revalidatePath('/');
    return;
}

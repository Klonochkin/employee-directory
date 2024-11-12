'use server';

import { deleteData } from './postgresDb';

export async function deleteSomething(params: FormData) {
    const id: string = String(params.get('id'));
    deleteData(Number(id));
}

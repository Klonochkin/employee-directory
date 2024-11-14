'use server';

import { deleteData } from './postgresDb';

export async function deleteSomething(params: FormData) {
    deleteData(Number(params.get('id')));
}

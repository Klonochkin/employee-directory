'use server';

import { updateData } from './postgresDb';

export async function editSomething(params: FormData) {
    const last_name: string = String(params.get('last_name'));
    const first_name: string = String(params.get('first_name'));
    const father_name: string = String(params.get('father_name'));
    const bday: string = String(params.get('bday'));
    const position: string = String(params.get('position'));
    const phone_number: string = String(params.get('phone_number'));
    const id: string = String(params.get('id'));
    updateData(
        last_name,
        first_name,
        father_name,
        bday,
        position,
        phone_number,
        id,
    );
}

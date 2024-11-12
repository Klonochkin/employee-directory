import { drizzle } from 'drizzle-orm/node-postgres';
import { employee } from '@/app/db/schema';
import { sql, asc, desc, eq } from 'drizzle-orm';
import { convertDateToISO } from './convert-date';

const db = drizzle(process.env.DATABASE_URL!);

export async function getEmployees(name = '', page: number, sort?: string) {
    let offset = (page - 1) * 10;
    offset = offset >= 0 ? offset : 0;
    name = name.toLowerCase();
    const res = await db
        .select()
        .from(employee)
        .where(
            sql`lower(${employee.first_name}) LIKE ${`%${name}%`} OR lower(${employee.last_name}) LIKE ${`%${name}%`} OR lower(${employee.father_name}) LIKE ${`%${name}%`}`,
        )
        .limit(30)
        .offset(offset)
        .orderBy(
            sort
                ? sort === 'asc'
                    ? asc(employee.bday)
                    : sort === 'desc'
                      ? desc(employee.bday)
                      : asc(employee.id)
                : asc(employee.id),
        );
    return res;
}

export async function getTotalCount(name = '') {
    name = name.toLowerCase();
    const res = await db
        .select({ count: sql`COUNT(*)` })
        .from(employee)
        .where(
            sql`lower(${employee.first_name}) LIKE ${`%${name}%`} OR lower(${employee.last_name}) LIKE ${`%${name}%`} OR lower(${employee.father_name}) LIKE ${`%${name}%`}`,
        );
    return Number(res[0]?.count) || 0;
}

export async function deleteData(id: number) {
    const res = await db.delete(employee).where(eq(employee.id, Number(id)));
    return res;
}

export async function updateData(
    last_name_value: string,
    first_name_value: string,
    father_name_value: string,
    bday_value: string,
    position_value: string,
    phone_number_value: string,
    id: string,
) {
    const bday_Date = convertDateToISO(bday_value);
    const res = await db
        .update(employee)
        .set({
            last_name: last_name_value,
            first_name: first_name_value,
            father_name: father_name_value,
            bday: bday_Date,
            position: position_value,
            phone_number: phone_number_value,
        })
        .where(eq(employee.id, Number(id)));
    return res;
}

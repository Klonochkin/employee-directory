import { drizzle } from 'drizzle-orm/node-postgres';
import { employee } from '@/app/db/schema';
import { sql, asc, desc } from 'drizzle-orm';

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

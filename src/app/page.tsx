import { getTotalCount, fetchEmployees } from './postgresDb';
import { Search } from '@/app/search';

import { Employees, columns } from '@/app/employees/columns';
import { DataTable } from '@/app/employees/data-table';

export default async function HomePage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const { name, page, sort } = await searchParams;
    let data = await fetchEmployees(name, Number(page), sort);
    const employee: Employees[] = data.map((row) => ({
        last_name: row.last_name,
        first_name: row.first_name,
        father_name: row.father_name,
        bday: new Date(row.bday),
        position: row.position,
        phone_number: row.phone_number,
    }));

    const count = await getTotalCount(name);
    return (
        <div className='flex flex-col items-center mt-4'>
            <div className='mb-10'>
                <Search></Search>
            </div>
            {data && data.length !== 0 ? (
                <DataTable
                    data={employee}
                    columns={columns}
                    initial={Number(page) ?? 1}
                    count={count}
                />
            ) : (
                'Список сотрудников пуст'
            )}
        </div>
    );
}

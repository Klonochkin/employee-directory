import { getTotalCount, getEmployees } from './postgresDb';
import { Search } from '@/app/search';

import { columns } from '@/app/employees/columns';
import { DataTable } from '@/app/employees/data-table';
import { ConfirmV2 } from './delete-form-data';
import { DialogDemo } from './dialog-edit-form';
import { Toaster } from 'sonner';

export default async function HomePage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const { name, page, sort } = await searchParams;
    const data = await getEmployees(name, Number(page), sort);

    const count = await getTotalCount(name);
    return (
        <div className='mt-4 flex flex-col items-center'>
            <div className='mb-10'>
                <Search></Search>
            </div>
            {data && data.length !== 0 ? (
                <DataTable
                    data={data}
                    columns={columns}
                    initial={Number(page) || 1}
                    count={count}
                />
            ) : (
                'Список сотрудников пуст'
            )}
            <ConfirmV2 />
            <DialogDemo />
            <Toaster />
        </div>
    );
}

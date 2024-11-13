import { getTotalCount, getEmployees } from './postgresDb';
import { Search } from '@/app/search';

import { columns } from '@/app/employees/columns';
import { DataTable } from '@/app/employees/data-table';
import { DeleteForm } from './delete-form-data';
import { EditDialog } from './dialog-edit-form';
import { Toaster } from 'sonner';
import { ContextProvider } from './context';

export default async function HomePage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const { name, page, sort } = await searchParams;
    const data = await getEmployees(name, Number(page), sort);
    const count = await getTotalCount(name);

    return (
        <ContextProvider>
            <div className='mt-4 flex flex-col items-center'>
                <div className='mb-10'>
                    <Search></Search>
                </div>
                <DataTable
                    data={data}
                    columns={columns}
                    initial={Number(page) || 1}
                    count={count}
                />
                <DeleteForm />
                <EditDialog />
                <Toaster />
            </div>
        </ContextProvider>
    );
}

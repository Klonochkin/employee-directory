import { getTotalCount, getEmployees } from './postgresDb';
import { Search } from '@/app/search';

import { columns } from '@/app/employees/columns';
import { DataTable } from '@/app/employees/data-table';
import { DeleteForm } from './delete-form-data';
import { EditDialog } from './dialog-edit-form';
import { Toaster } from 'sonner';
import { ContextProvider } from './context';
import { DataTableEmpty } from './employees/data-table-empty';
import { AddEmployee } from './add-employee-button';
import { AddEmployeeDialog } from './dialog-add-employee';

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
                <div className='mb-10 flex flex-col'>
                    <Search />
                    <AddEmployee />
                </div>
                {data && data.length !== 0 ? (
                    <DataTable
                        data={data}
                        columns={columns}
                        initial={Number(page) || 1}
                        count={count}
                    />
                ) : (
                    <DataTableEmpty count={count} />
                )}
                <DeleteForm />
                <EditDialog data={data} />
                <AddEmployeeDialog />
                <Toaster />
            </div>
        </ContextProvider>
    );
}

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Schemas } from './form-schemas';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DatePicker } from './date-picker';
import { useContext, useEffect } from 'react';
import { editSomething } from './server-actions';
import { toast } from 'sonner';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Context } from './context';
import { removeSearchParam } from './params';
import { Employees } from './db/schema';
export function EditForm({ data }: { data: Employees[] }) {
    const context = useContext(Context);
    const { setIsOpenDialogEdit } = context;
    const searchParams = useSearchParams();
    const selected = searchParams.get('selected');
    const form = useForm<z.infer<typeof Schemas>>({
        resolver: zodResolver(Schemas),
        defaultValues: {
            last_name: '',
            first_name: '',
            father_name: '',
            bday: '',
            position: '',
            phone_number: '',
            id: '',
        },
    });

    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        if (selected && data) {
            form.reset({
                last_name: data[Number(selected)].last_name,
                first_name: data[Number(selected)].first_name,
                father_name: data[Number(selected)].father_name,
                bday: data[Number(selected)].bday,
                position: data[Number(selected)].position,
                phone_number: data[Number(selected)].phone_number,
                id: String(data[Number(selected)].id),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    const onSubmit = () => {
        const form = document.getElementById('edit-form') as HTMLFormElement;
        form.requestSubmit();
        toast('Данные обновлены', {
            action: {
                label: 'Скрыть',
                onClick: () => console.log('скрыт'),
            },
        });
        setIsOpenDialogEdit((prev) => !prev);

        removeSearchParam('selected', pathname, router);
    };

    return (
        <Form {...form}>
            <form id='edit-form' action={editSomething} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='last_name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Фамилия</FormLabel>
                            <FormControl>
                                <Input
                                    id='last_name'
                                    placeholder='Иванов'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='first_name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Имя</FormLabel>
                            <FormControl>
                                <Input
                                    id='first_name'
                                    placeholder='Иван'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='father_name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Отчество</FormLabel>
                            <FormControl>
                                <Input
                                    id='father_name'
                                    placeholder='Иванович'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='bday'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>День рождения</FormLabel>
                            <FormControl>
                                <div>
                                    <DatePicker
                                        value={field.value}
                                        setValue={field.onChange}
                                    />
                                    <Input
                                        id='bday'
                                        className='sr-only'
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='position'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Должность</FormLabel>
                            <FormControl>
                                <Input
                                    id='position'
                                    placeholder='Начальник'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='phone_number'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Номер телефона</FormLabel>
                            <FormControl>
                                <Input
                                    id='phone_number'
                                    placeholder='+79000000000'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='id'
                    render={({ field }) => (
                        <Input type='hidden' id='id' {...field} />
                    )}
                />
                <Button
                    type='button'
                    onClick={() => {
                        form.handleSubmit(onSubmit)();
                    }}>
                    Submit
                </Button>
            </form>
        </Form>
    );
}

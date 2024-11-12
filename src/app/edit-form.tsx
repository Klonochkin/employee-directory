'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Schemas } from './edit-form-schemas';
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
import { useEffect } from 'react';
import { editSomething } from './edit-data';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
export function EditForm() {
    const values = Array(7).fill('');
    const searchParams = useSearchParams();
    const selected = searchParams.get('selected');
    const list = [
        '_last_name',
        '_first_name',
        '_father_name',
        '_bday',
        '_position',
        '_phone_number',
        '_id',
    ];
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
    useEffect(() => {
        for (let i = 0; i < 7; i++) {
            const path = selected + list[i];
            values[i] = document.getElementById(path)?.textContent;
        }
        form.reset({
            last_name: values[0],
            first_name: values[1],
            father_name: values[2],
            bday: values[3],
            position: values[4],
            phone_number: values[5],
            id: values[6],
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    const onSubmit = () => {
        const tdDialog = document.getElementById(
            selected + '_actions',
        ) as HTMLElement;
        const buttonDialog = tdDialog.querySelector(
            'button',
        ) as HTMLButtonElement;
        buttonDialog.click();

        const form = document.getElementById('edit-form') as HTMLFormElement;
        form.requestSubmit();
        toast('Данные обновлены', {
            action: {
                label: 'Скрыть',
                onClick: () => console.log('скрыт'),
            },
        });
        const button = document.getElementById(
            'dialog-close',
        ) as HTMLButtonElement;
        button.click();
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
                        <FormItem className='sr-only'>
                            <FormLabel>id</FormLabel>
                            <FormControl>
                                <Input
                                    id='id'
                                    placeholder='+79000000000'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
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

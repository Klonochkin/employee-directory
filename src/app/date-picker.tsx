'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { ru } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { convertTextToDate } from './convert-date';

export function DatePicker({
    setValue,
    value,
}: {
    setValue: (value: string) => void;
    value: string;
    isResetForm?: boolean;
}) {
    const [date, setDate] = React.useState<Date | undefined>(
        value?.length > 0 ? convertTextToDate(value) : undefined,
    );
    const today = new Date();
    const minDate = new Date(today);
    minDate.setFullYear(today.getFullYear() - 16);
    const maxDate = new Date(today);
    maxDate.setFullYear(today.getFullYear() - 100);

    React.useEffect(() => {
        setDate(value?.length > 0 ? convertTextToDate(value) : undefined);
    }, [value]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    className={cn(
                        'mt-4 w-[100%] justify-start text-left font-normal',
                        !date && 'text-muted-foreground',
                    )}>
                    <CalendarIcon />
                    {date ? (
                        format(date, 'PPP', { locale: ru })
                    ) : (
                        <span>Выберите дату</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
                <Calendar
                    mode='single'
                    selected={date}
                    onSelect={(date) => {
                        setDate(date);
                        setValue(date?.toISOString().slice(0, 10) ?? '');
                    }}
                    initialFocus
                    fromDate={maxDate}
                    toDate={minDate}
                    locale={ru}
                />
            </PopoverContent>
        </Popover>
    );
}

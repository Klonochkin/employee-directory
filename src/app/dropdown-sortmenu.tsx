'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronsUpDown } from 'lucide-react';
import { addOrUpdateParam, removeSearchParam } from './params';
import { useRouter, usePathname } from 'next/navigation';

export function DropdownMenuRadioGroupDemo() {
    const [position, setPosition] = React.useState('');
    const router = useRouter();
    const pathname = usePathname();
    React.useEffect(() => {
        if (position !== '') {
            addOrUpdateParam('sort', position, pathname, router);
        } else {
            removeSearchParam('sort', pathname, router);
        }
    }, [position]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost'>
                    <span>День рождения</span>
                    {position === 'desc' ? (
                        <ArrowDown />
                    ) : position === 'asc' ? (
                        <ArrowUp />
                    ) : (
                        <ChevronsUpDown />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={setPosition}>
                    <DropdownMenuRadioItem value='desc'>
                        <ArrowUp height='15' />
                        По убыванию
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='asc'>
                        <ArrowDown height='15' />
                        По возврастанию
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value=''>
                        <ChevronsUpDown height='15' />
                        Без сортировки
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

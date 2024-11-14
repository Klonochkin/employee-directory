'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';
import { addOrUpdateParam, removeSearchParam } from './params';
import { useRouter, usePathname } from 'next/navigation';

export function DropdownMenuRadioGroupDemo() {
    const [position, setPosition] = React.useState('');
    const router = useRouter();
    const pathname = usePathname();

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const sortParam = params.get('sort');
        setPosition(sortParam || '');
    }, []);
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
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onClick={() => {
                            setPosition('desc');
                            addOrUpdateParam('sort', 'desc');
                        }}>
                        <ArrowUp height='15' />
                        По убыванию
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            setPosition('asc');
                            addOrUpdateParam('sort', 'asc');
                        }}>
                        <ArrowDown height='15' />
                        По возврастанию
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            setPosition('');
                            removeSearchParam('sort', pathname, router);
                        }}>
                        <ChevronsUpDown height='15' />
                        Без сортировки
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

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
import { ArrowUpDown } from 'lucide-react';
import { addOrUpdateParam, removeSearchParam } from './params';
import { useRouter, usePathname } from 'next/navigation';

export function DropdownMenuRadioGroupDemo() {
    const [position, setPosition] = React.useState('');
    const router = useRouter();
    const pathname = usePathname();
    React.useEffect(() => {
        if (position !== 'none') {
            addOrUpdateParam('sort', position, pathname, router);
        } else {
            removeSearchParam('sort', pathname, router);
        }
    }, [position]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost'>
                    День рождения
                    <ArrowUpDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={setPosition}>
                    <DropdownMenuRadioItem value='desc'>
                        По убыванию
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='asc'>
                        По возврастанию
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='none'>
                        Без сортировки
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

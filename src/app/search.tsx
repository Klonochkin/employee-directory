'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { removeSearchParam, addAndRemoveParam } from '@/app/params';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Search() {
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (inputRef.current) {
            inputRef.current.value = params.get('name') ?? '';
        }
    }, []);

    return (
        <div className='relative'>
            <Label className='mx-4 font-sans text-sm'>
                <Input
                    ref={inputRef}
                    type='text'
                    name='name'
                    placeholder='Поиск'
                    onChange={({ target: { value } }) => {
                        if (value.trim() === '') {
                            removeSearchParam('name', pathname, router);
                        } else {
                            addAndRemoveParam('name', 'page', value);
                        }
                    }}
                />
                <Button
                    variant='ghost'
                    className={cn(
                        'absolute right-1 top-[28px] m-0 h-auto p-2',
                        inputRef.current?.value ? 'not-sr-only' : 'sr-only',
                    )}
                    onClick={() => {
                        if (inputRef.current?.value) {
                            inputRef.current.value = '';
                            removeSearchParam('name', pathname, router);
                        }
                    }}>
                    <Plus className='rotate-45 scale-125' strokeWidth='2' />
                </Button>
            </Label>
        </div>
    );
}

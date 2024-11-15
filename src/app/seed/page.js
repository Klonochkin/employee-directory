'use client';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

const TestPage = () => {
    useEffect(() => {
        const hello = async () => {
            try {
                const response = await fetch('/api');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Error fetching total count:', error);
            }
        };

        hello();
    }, []);

    return (
        <div className='flex flex-col items-center justify-center'>
            <h1>База данных успешно заполнена</h1>
            <Button
                onClick={() => {
                    redirect('/');
                }}
                variant='ghost'>
                Вернуться в корень
            </Button>
        </div>
    );
};

export default TestPage;

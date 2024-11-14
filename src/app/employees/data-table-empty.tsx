'use client';

import { addOrUpdateParam } from '../params';

export function DataTableEmpty({ count }: { count: number }) {
    if (count !== 0) {
        addOrUpdateParam('page', String(Math.floor(count / 10)));
    }
    return <p>Список сотрудников пуст</p>;
}

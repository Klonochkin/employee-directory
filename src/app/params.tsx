import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { redirect } from 'next/navigation';

export function addOrUpdateParam(key: string, value: string) {
    const newParams = new URLSearchParams(window.location.search);
    newParams.set(key, value);
    redirect(`/?${newParams.toString()}`);
}

export function addAndRemoveParam(
    keyAdd: string,
    keyRemove: string,
    valueAdd: string,
) {
    const newParams = new URLSearchParams(window.location.search);
    newParams.set(keyAdd, valueAdd);
    newParams.delete(keyRemove);
    redirect(`/?${newParams.toString()}`);
}

export function removeSearchParam(
    key: string,
    pathname: string,
    router: AppRouterInstance,
) {
    const params = new URLSearchParams(window.location.search);
    params.delete(key);
    let newUrl: string = '';
    if (params.toString() !== '') {
        newUrl = `${pathname}?${params.toString()}`;
    } else {
        newUrl = `${pathname}`;
    }
    router.push(newUrl);
}

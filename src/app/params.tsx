import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function addOrUpdateParam(
    key: string,
    value: string,
    pathname: string,
    router: AppRouterInstance,
) {
    const newParams = new URLSearchParams(window.location.search);
    newParams.set(key, value);
    router.push(`${pathname}?${newParams.toString()}`);
}

export function addAndRemoveParam(
    keyAdd: string,
    keyRemove: string,
    valueAdd: string,
    pathname: string,
    router: AppRouterInstance,
) {
    const newParams = new URLSearchParams(window.location.search);
    newParams.set(keyAdd, valueAdd);
    newParams.delete(keyRemove);
    router.push(`${pathname}?${newParams.toString()}`);
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

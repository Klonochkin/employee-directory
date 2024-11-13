'use client';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface TypeContext {
    isOpenDialog: boolean;
    setIsOpenDialog: Dispatch<SetStateAction<boolean>>;
}

const initialContextValue: TypeContext = {
    isOpenDialog: false,
    setIsOpenDialog: () => {},
};

export const Context = createContext<TypeContext>(initialContextValue);

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    return (
        <Context.Provider
            value={{
                isOpenDialog,
                setIsOpenDialog,
            }}>
            {children}
        </Context.Provider>
    );
};

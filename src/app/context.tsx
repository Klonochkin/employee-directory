'use client';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface TypeContext {
    isOpenDialogEdit: boolean;
    isOpenDialogAdd: boolean;
    setIsOpenDialogEdit: Dispatch<SetStateAction<boolean>>;
    setIsOpenDialogAdd: Dispatch<SetStateAction<boolean>>;
}

const initialContextValue: TypeContext = {
    isOpenDialogEdit: false,
    isOpenDialogAdd: false,
    setIsOpenDialogEdit: () => {},
    setIsOpenDialogAdd: () => {},
};

export const Context = createContext<TypeContext>(initialContextValue);

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isOpenDialogEdit, setIsOpenDialogEdit] = useState(false);
    const [isOpenDialogAdd, setIsOpenDialogAdd] = useState(false);

    return (
        <Context.Provider
            value={{
                isOpenDialogEdit: isOpenDialogEdit,
                isOpenDialogAdd: isOpenDialogAdd,
                setIsOpenDialogEdit: setIsOpenDialogEdit,
                setIsOpenDialogAdd: setIsOpenDialogAdd,
            }}>
            {children}
        </Context.Provider>
    );
};

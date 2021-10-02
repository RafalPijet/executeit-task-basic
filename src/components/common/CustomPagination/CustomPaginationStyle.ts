import { MouseEvent } from 'react';

export interface Props {
    quantity: number;
    onChangePage: (
        event: MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => void;
    page: number;
    isHidden?: boolean;
}
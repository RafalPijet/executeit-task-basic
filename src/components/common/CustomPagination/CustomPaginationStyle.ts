import { MouseEvent } from 'react';

export interface Props {
    quantity: number;
    onChangePage: (
        event: MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => void;
    onChangeRowsPerPage: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    rowsPerPage: number;
    page: number;
    isHidden?: boolean;
    rowsPerPageOptions: number[],
}
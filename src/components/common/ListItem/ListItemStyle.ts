import { makeStyles, createStyles } from '@mui/styles';
import { buttonBackground, listBackground } from '../../../globalStyles';

export const useStyles = makeStyles(() => createStyles({
    root: {
        backgroundColor: `${buttonBackground} !important`,
        margin: '10px 0',
        padding: 10,
        width: 200,
        cursor: 'pointer'
    },
    selected: {
        backgroundColor: `${listBackground} !important`
    }
}))

export interface Props {
    id: string;
    name: string;
    selectedItem: string;
    getItemId: (id: string) => void;
}
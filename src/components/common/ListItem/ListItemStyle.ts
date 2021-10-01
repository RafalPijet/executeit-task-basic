import { makeStyles, createStyles } from '@mui/styles';
import { selectedBackground } from '../../../globalStyles';

export const useStyles = makeStyles(() => createStyles({
    root: {
        margin: '10px 0',
        padding: 10,
        maxWidth: 200,
        cursor: 'pointer'
    },
    selected: {
        backgroundColor: `${selectedBackground} !important`
    }
}))

export interface Props {
    id: string;
    name: string;
    selectedItem: string;
    getItemId: (id: string) => void;
}
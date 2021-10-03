import { makeStyles, createStyles } from '@mui/styles';
import { Launch } from '../../../globalTypes';
import { listBackground } from '../../../globalStyles';

export const useStyles = makeStyles(() => createStyles({
    root: {
        height: '100%',
        width: '100%',
        backgroundColor: `${listBackground} !important`
    },
    content: {
        padding: 10,
        height: 600,
        overflow: 'auto'
    },
    buttonList: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    display: {
        display: 'flex',
        alignItems: 'center',
    },
    center: {
        justifyContent: 'center',
    },
    right: {
        justifyContent: 'flex-end'
    },

}))

export interface Props {
    content: Launch;
    chosenId: string;
    getRemovedId: (id: string) => void;
    isFavorites: boolean;
}
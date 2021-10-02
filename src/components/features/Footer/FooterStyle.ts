import { makeStyles, createStyles } from '@mui/styles';
import { footerBackground } from '../../../globalStyles';
import { SelectedLaunch } from '../../../globalTypes';

export const useStyles = makeStyles(() => createStyles({
    root: {
        padding: 10,
        margin: '0 10px 10px',
        backgroundColor: `${footerBackground} !important`
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))

export interface Props {
    getPage: (page: number) => void;
    getChosedLaunch: (item: SelectedLaunch | null) => void;
}
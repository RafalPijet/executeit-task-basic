import { makeStyles, createStyles } from '@mui/styles';
import { container, primaryBackground, secondaryBackground } from '../../../globalStyles';

export const useStyles = makeStyles(() => createStyles({
    container: {
        minHeight: 700,
        padding: '20px 0',
        backgroundColor: primaryBackground,
        ...container
    },
    root: {
        backgroundColor: `${secondaryBackground} !important`,
    },
    content: {
        padding: 10,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    center: {
        justifyContent: 'center',
    },
}))
import { makeStyles, createStyles } from '@mui/styles';
import { container, primaryBackground } from '../../../globalStyles';

export const useStyles = makeStyles(() => createStyles({
    container: {
        minHeight: 700,
        padding: '20px 0',
        backgroundColor: primaryBackground,
        ...container
    },
    content: {
        padding: 10,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}))
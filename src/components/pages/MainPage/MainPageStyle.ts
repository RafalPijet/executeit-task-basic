import { makeStyles, createStyles } from '@mui/styles';
import { container, primaryBackground } from '../../../globalStyles';

export const useStyles = makeStyles(() => createStyles({
    container: {
        padding: '20px 0',
        backgroundColor: primaryBackground,
        ...container
    },
}))
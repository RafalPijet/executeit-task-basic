import { makeStyles, createStyles } from '@mui/styles';

export const useStyles = makeStyles(() => createStyles({
    root: {
        padding: 10,
        margin: '0 10px 10px'
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))
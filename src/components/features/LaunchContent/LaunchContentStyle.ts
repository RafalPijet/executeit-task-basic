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
        height: 608,
        overflow: 'auto'
    },
    buttonList: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
}))

export interface Props {
    content: Launch
}
import { makeStyles, createStyles } from '@mui/styles';
import { Launch } from '../../../globalTypes';

export const useStyles = makeStyles(() => createStyles({
    root: {
        height: '100%',
    },
    content: {
        padding: 10
    },
    contentBox: {
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center'
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
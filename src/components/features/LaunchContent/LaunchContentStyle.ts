import { makeStyles, createStyles } from '@mui/styles';
import { Launch } from '../../../globalTypes';

export const useStyles = makeStyles(() => createStyles({
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
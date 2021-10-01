import { makeStyles, createStyles } from '@mui/styles';
import { Launch } from '../../../globalTypes';

export const useStyles = makeStyles(() => createStyles({
    list: {
        minWidth: 250,
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
    },
}))

export interface Props {
    launches: Omit<Launch, 'description' | 'images'>[];
    chosenId: string;
    getChosenId: (id: string) => void;
}
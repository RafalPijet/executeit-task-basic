import { makeStyles, createStyles } from '@mui/styles';
import { Launch } from '../../../globalTypes';
import { secondaryBackground } from '../../../globalStyles';

export const useStyles = makeStyles(() => createStyles({
    list: {
        minWidth: 270,
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        backgroundColor: secondaryBackground
    },
    empty: {
        height: '640px',
        display: 'flex',
        alignItems: 'center',
    }
}))

export interface Props {
    launches: Omit<Launch, 'description' | 'images'>[] | null;
    chosenId: string;
    getChosenId: (id: string) => void;
    isAvailable: boolean;
    isPending: boolean;
    isFavorites: boolean;
}
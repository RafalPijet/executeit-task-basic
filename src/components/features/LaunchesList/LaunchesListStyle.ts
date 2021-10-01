import { Launch } from '../../../globalTypes';

export interface Props {
    launches: Omit<Launch, 'description' | 'images'>[];
    chosenId: string;
    getChosenId: (id: string) => void;
}
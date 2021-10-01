export interface Ship {
    id: string;
    name?: string;
    image?: string;
}

export interface Launch {
    id: string;
    name: string;
    description: string;
    images: Ship[];
}

export interface SelectedLaunch {
    id: string,
    name: string
}
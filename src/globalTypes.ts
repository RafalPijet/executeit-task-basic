export interface Ship {
    id: string;
    name?: string;
    image?: string;
}

export interface Launch {
    name: string;
    description: string;
    images: Ship[];
}
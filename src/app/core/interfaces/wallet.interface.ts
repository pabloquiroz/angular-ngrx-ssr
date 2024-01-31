export interface Wallet {
    id: string;
    name: string;
    assets?: Assets[];
}


export interface Assets {
    id: string;
    name: string;
    code: string;
    fractions: number;
    used: boolean;
}

export interface ActionsCrud {
    option: number;
    row: Wallet
}
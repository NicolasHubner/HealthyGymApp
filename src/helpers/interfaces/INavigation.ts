export interface IParams {
    screen?: string;
    email?: string;
}

export interface INavigation {
    [x: string]: any;
    reset(): unknown;
    goBack(): void;
    navigate: (pathd: string, params?: IParams) => void;
    setOptions: (options: any) => void;
}

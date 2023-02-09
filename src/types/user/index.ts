export interface User {
    token: string | undefined;
    id: number | undefined;
    username: string | undefined;
    email: string | undefined;
    provider: string | undefined;
    confirmed: boolean | undefined;
    blocked: boolean | undefined;
    name?: string | undefined | null;
    birthdate: string | undefined;
    gender: string | undefined;
    weight?: number | undefined | null;
    height?: number | undefined | null;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    goal_type: string | undefined;
    phone?: string | undefined | null;
    foodRestrictions: string[] | undefined;
    passwordForRegister?: string | undefined;
    isLogged?: boolean | undefined;
}

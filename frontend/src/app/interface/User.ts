export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

export enum UserAccess {
    MANAGER = 'MANAGER',
    EMPLOYEE = 'EMPLOYEE',
    OWNER = 'OWNER'
}

export interface User {
    id: string; 
    name: string;
    surname: string;
    phone?: string | null;
    email: string;
    status: UserStatus;
    access: UserAccess;
}

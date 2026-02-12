export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    age: number;
    image: string;
}

export interface UsersResponse {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}

export interface CreateUserPayload {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
}

export interface createUserResponse extends User{}
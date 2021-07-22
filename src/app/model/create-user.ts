export interface CreateUser {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone: number;
    address: string;
    pincode: string;
    desigbation?: string;
}
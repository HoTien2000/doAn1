import { Role } from "./role";

export class UserSystem {
    id?: number;
    email?: string;
    password?: string;
    fullName?: string;
    gender?: string;
    dateOfBirth?: string;
    phone?: string;
    specificAddress?: string;
    wards?: string;
    district?: string;
    province?: string;
    lastUpdate?: string;
    roles?:Role[];
}

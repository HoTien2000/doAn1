import { UserSystem } from "./user-system";

export class PasswordResetToken {
    id?: number;
    token?: number;
    expirationDate?: string;
    userSystem?: UserSystem;
}

import { Role } from './enums/role.enum';

export class User {
    constructor(public username: string,
                public role: Role = Role.CLIENT,
                public is_admin: boolean,
                public id?: number) {}
}

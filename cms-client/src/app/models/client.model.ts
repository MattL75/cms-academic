import { Role } from './enums/role.enum';

export class Client {
    constructor(public email_domain: string,
                public name: string,
                public province: string,
                public username?: string,
                public password?: string,
                public role?: Role,
                public is_admin?: boolean,
                public id?: number) {
    }
}

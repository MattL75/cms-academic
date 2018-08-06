import { Role } from './enums/role.enum';

export class SalesAssociate {
    constructor(public first_name: string = 'John',
                public last_name: string = 'Doe',
                public username?: string,
                public password?: string,
                public role?: Role,
                public is_admin?: boolean,
                public id?: number) {
    }
}

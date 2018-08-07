import { InsuranceType } from './enums/insurance.enum';
import { Province } from './enums/province.enum';
import { Role } from './enums/role.enum';

export class Manager {
    constructor(public first_name: string = 'John',
                public last_name: string = 'Doe',
                public email: string = 'john.doe@gmail.com',
                public phone_number: string = '123-4567',
                public middle_initial: string = 'M',
                public insurance?: InsuranceType,
                public province?: Province,
                public contract_type_preference?: string,
                public department_id?: number,
                public username?: string,
                public password?: string,
                public role?: Role,
                public is_admin?: boolean,
                public id?: number) {
    }
}

// TODO remove the optional of 'insurance' and 'province' and add a default value.

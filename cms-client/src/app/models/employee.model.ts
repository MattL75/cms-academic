import { InsuranceType } from './enums/insurance.enum';
import { Province } from './enums/province.enum';
import { Role } from './enums/role.enum';

export class Employee {
    constructor(public first_name: string = 'John',
                public last_name: string = 'Doe',
                public email: string = 'john.doe@gmail.com',
                public insurance: InsuranceType,
                public province: Province,
                public username?: string,
                public password?: string,
                public role?: Role,
                public is_admin?: boolean,
                public department_id?: number,
                public id?: number) {}
}

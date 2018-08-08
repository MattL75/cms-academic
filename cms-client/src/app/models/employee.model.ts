import { InsuranceType } from './enums/insurance.enum';
import { Province } from './enums/province.enum';
import { Role } from './enums/role.enum';

export class Employee {
    constructor(public first_name: string = 'John',
                public last_name: string = 'Doe',
                public insurance_type: InsuranceType,
                public province_name: Province,
                public contract_type_preference?: string,
                public username?: string,
                public password?: string,
                public role?: Role,
                public is_admin?: boolean,
                public department_id?: number,
                public id?: number) {}
}

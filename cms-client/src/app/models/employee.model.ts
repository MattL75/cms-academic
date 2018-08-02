import { InsuranceType } from './enums/insurance.enum';
import { Province } from './enums/province.enum';

export class Employee {
    constructor(public first_name: string = 'John',
                public last_name: string = 'Doe',
                public email: string = 'john.doe@gmail.com',
                public insurance: InsuranceType,
                public province: Province,
                public user_id?: number,
                public department_id?: number,
                public id?: number) {}
}

import { InsuranceType } from './enums/insurance.enum';
import { Province } from './enums/province.enum';

export class Manager {
    constructor(public first_name: string = 'John',
                public last_name: string = 'Doe',
                public email: string = 'john.doe@gmail.com',
                public phone_number: string = '123-4567',
                public middle_initials: string = 'M',
                public insurance?: InsuranceType,
                public province?: Province,
                public department_id?: number,
                public id?: number) {
    }
}

// TODO remove the optional of 'insurance' and 'province' and add a default value.

class Employee {
    constructor(public first_name: string = 'John',
                public last_name: string = 'Doe',
                public email: string = 'john.doe@gmail.com',
                public department_id: number,
                public insurance_type: string,
                public province_name: string,
                public user_id: number,
                public id?: number) {}
}

class User {
    constructor(public username: string,
                public role: Role = Role.CLIENT,
                public is_admin: boolean,
                public id?: number) {}
}

enum Role {
    SALES_ASSOCIATE = 'sales_associate',
    CLIENT = 'client',
    MANAGER = 'manager',
    EMPLOYEE = 'employee'
}

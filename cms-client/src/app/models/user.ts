class User {
    constructor(public username,
                public role: Role = Role.CLIENT,
                public id?: number) {}
}

enum Role {
    SALES_ASSOCIATE = 'sales_associate',
    CLIENT = 'client',
    MANAGER = 'manager',
    EMPLOYEE = 'employee'
}

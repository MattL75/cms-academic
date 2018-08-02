class Contract {
    constructor(public acv: number,
                public start_date: Date,
                public initial_amount: number,
                public client_satisfaction: number,
                public recorded_by: number,
                public department_id: number,
                public client_id: number,
                public business_line: string,
                public contract_type: string,
                public id?: number) {}
}

enum ContractType {
    GOLD = 'gold',
    SILVER = 'silver',
    PLATINUM = 'platinum',
    BRONZE = 'bronze'
}

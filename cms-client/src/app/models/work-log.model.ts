export class WorkLog {
    constructor(public date_worked: Date,
                public hours_worked: string,
                public contract_id: number,
                public employee_id: number) {
    }
}

// May need to change type of 'hours_worked'

export class WorkLog {
    constructor(public date_worked: Date,
                public hours_worked: string,
                public assignment_id: number,
                public employee_id: number,
                public id?: number) {
    }
}

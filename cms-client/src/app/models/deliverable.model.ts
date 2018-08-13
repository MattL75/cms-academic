export class Deliverable {
    constructor(public contract_name: string,
                public deliv_number: number,
                public is_final: boolean,
                public days_to_delivery: number,
                public days_taken: number,
                public month_scheduled: string,
                public month_delivered: string,
                public is_active: boolean) {
    }
}

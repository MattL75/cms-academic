import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'cms-managers',
    templateUrl: './managers.component.html',
    styleUrls: ['./managers.component.scss', '../home.component.scss']
})
export class ManagersComponent implements OnInit {

    TEST_DATA: Manager[] = [
        {employeeId: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@doe.com'},
        {employeeId: 2, first_name: 'Rob', last_name: 'Ford', email: 'crack@ford.com'},
        {employeeId: 3, first_name: 'Doug', last_name: 'Ford', email: 'doug@ford.com'},
        {employeeId: 4, first_name: 'Kebab', last_name: 'Kebabo', email: 'kebabo@kebabo.com'},
        {employeeId: 5, first_name: 'Martin', last_name: 'Spasov', email: 'nerd1@kebabo.com'},
        {employeeId: 6, first_name: 'Jesse', last_name: 'Tremblay', email: 'nerd2@kebabo.com'},
        {employeeId: 7, first_name: 'Manel', last_name: 'Guay-Montserrat', email: 'nerd3@kebabo.com'},
        {employeeId: 8, first_name: 'Mathieu', last_name: 'Lajoie', email: 'nerd4@kebabo.com'},
        {employeeId: 9, first_name: 'Richard', last_name: 'Lajoie', email: 'richard@nuance.com'},
        {employeeId: 10, first_name: 'Alain', last_name: 'Ratier', email: 'ratier@soluteo.com'},
        {employeeId: 11, first_name: 'Marijane', last_name: 'Moreau-Peterson', email: 'marijane@soluteo.com'},
        {employeeId: 11, first_name: 'Marijane', last_name: 'Moreau-Peterson', email: 'marijane@soluteo.com'},
        {employeeId: 11, first_name: 'Marijane', last_name: 'Moreau-Peterson', email: 'marijane@soluteo.com'},
        {employeeId: 11, first_name: 'Marijane', last_name: 'Moreau-Peterson', email: 'marijane@soluteo.com'},
        {employeeId: 11, first_name: 'Marijane', last_name: 'Moreau-Peterson', email: 'marijane@soluteo.com'},
        {employeeId: 11, first_name: 'Marijane', last_name: 'Moreau-Peterson', email: 'marijane@soluteo.com'},
    ];

    dataSource = new MatTableDataSource<Manager>(this.TEST_DATA);
    displayedColumns: string[] = ['employeeId', 'name', 'email', 'actions'];

    constructor() {
    }

    ngOnInit() {
    }

    addEntity(): void {
        // Open new entity dialog
        // Snackbar confirmation
    }

    edit(element: Manager): void {
        // Open new entity dialog, populated with element
        // Snackbar confirmation
    }

    delete(element: Manager): void {
        // Open confirmation dialog
        // Delete item
        // Snackbar confirmation
    }
}

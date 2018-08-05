import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule, MatDatepickerModule,
    MatDialogModule,
    MatDividerModule, MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule, MatNativeDateModule,
    MatProgressSpinnerModule,
    MatRippleModule, MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';
import { UserAuthComponent } from './components/login/user-auth/user-auth.component';
import { RegisterComponent } from './components/login/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagersComponent } from './components/home/managers/managers.component';
import { EmployeesComponent } from './components/home/employees/employees.component';
import { SnackbarService } from './services/snackbar.service';
import { HttpClientModule } from '@angular/common/http';
import { ManagersDialogComponent } from './components/home/managers/managers-dialog/managers-dialog.component';
import { ConfirmDialogComponent } from './components/utils/confirm-dialog/confirm-dialog.component';
import { ManagersService } from './services/entity/managers.service';
import { EmployeesService } from './services/entity/employees.service';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { ContractsComponent } from './components/home/contracts/contracts.component';
import { ClientsComponent } from './components/home/clients/clients.component';
import { DepartmentsComponent } from './components/home/departments/departments.component';
import { UsersComponent } from './components/home/users/users.component';
import { UsersService } from './services/entity/users.service';
import { DepartmentsService } from './services/entity/departments.service';
import { ContractsService } from './services/entity/contracts.service';
import { ClientsService } from './services/entity/clients.service';
import { EmployeesDialogComponent } from './components/home/employees/employees-dialog/employees-dialog.component';
import { DepartmentsDialogComponent } from './components/home/departments/departments-dialog/departments-dialog.component';
import { UsersDialogComponent } from './components/home/users/users-dialog/users-dialog.component';
import { ContractsDialogComponent } from './components/home/contracts/contracts-dialog/contracts-dialog.component';
import { ClientsDialogComponent } from './components/home/clients/clients-dialog/clients-dialog.component';
import { SalesAssociatesComponent } from './components/home/sales-associates/sales-associates.component';
import { SalesAssociatesDialogComponent } from './components/home/sales-associates/sales-associates-dialog/sales-associates-dialog.component';
import { NormalizePipe } from './pipes/normalize.pipe';
import { EmployeeProfileComponent } from './components/profiles/employee-profile/employee-profile.component';
import { BaseProfileComponent } from './components/profiles/base-profile/base-profile.component';
import { ManagerProfileComponent } from './components/profiles/manager-profile/manager-profile.component';
import { ClientProfileComponent } from './components/profiles/client-profile/client-profile.component';
import { SalesProfileComponent } from './components/profiles/sales-profile/sales-profile.component';
import { ClientContractsComponent } from './components/role-pages/client/client-contracts/client-contracts.component';
import { SupervisedComponent } from './components/role-pages/manager/supervised/supervised.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        UserAuthComponent,
        RegisterComponent,
        ManagersComponent,
        EmployeesComponent,
        ManagersDialogComponent,
        ConfirmDialogComponent,
        DashboardComponent,
        ContractsComponent,
        ClientsComponent,
        DepartmentsComponent,
        UsersComponent,
        EmployeesDialogComponent,
        DepartmentsDialogComponent,
        UsersDialogComponent,
        ContractsDialogComponent,
        ClientsDialogComponent,
        SalesAssociatesComponent,
        SalesAssociatesDialogComponent,
        NormalizePipe,
        EmployeeProfileComponent,
        BaseProfileComponent,
        ManagerProfileComponent,
        ClientProfileComponent,
        SalesProfileComponent,
        ClientContractsComponent,
        SupervisedComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,

        // Material Modules
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatRippleModule,
        MatMenuModule,
        MatCardModule,
        MatDividerModule,
        MatTableModule,
        MatSortModule,
        MatSnackBarModule,
        MatDialogModule,
        MatExpansionModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    providers: [
        AuthService,
        AuthGuard,
        SnackbarService,
        ManagersService,
        EmployeesService,
        UsersService,
        DepartmentsService,
        ContractsService,
        ClientsService
    ],
    entryComponents: [
        ConfirmDialogComponent,
        ManagersDialogComponent,
        EmployeesDialogComponent,
        DepartmentsDialogComponent,
        UsersDialogComponent,
        ContractsDialogComponent,
        ClientsDialogComponent,
        SalesAssociatesDialogComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

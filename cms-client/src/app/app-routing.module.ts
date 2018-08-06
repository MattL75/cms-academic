import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/login/register/register.component';
import { UserAuthComponent } from './components/login/user-auth/user-auth.component';
import { ManagersComponent } from './components/home/managers/managers.component';
import { EmployeesComponent } from './components/home/employees/employees.component';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { ContractsComponent } from './components/home/contracts/contracts.component';
import { ClientsComponent } from './components/home/clients/clients.component';
import { UsersComponent } from './components/home/users/users.component';
import { DepartmentsComponent } from './components/home/departments/departments.component';
import { SalesAssociatesComponent } from './components/home/sales-associates/sales-associates.component';
import { BaseProfileComponent } from './components/profiles/base-profile/base-profile.component';
import { ClientContractsComponent } from './components/role-pages/client/client-contracts/client-contracts.component';
import { ClientGuard } from './guards/client.guard';
import { AdminGuard } from './guards/admin.guard';
import { WorkLogComponent } from './components/role-pages/employee/work-log/work-log.component';
import { EmployeeGuard } from './guards/employee.guard';
import { NotClientGuard } from './guards/not-client.guard';

const routes: Routes = [
    {
        path: '', component: HomeComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
            {path: 'managers', component: ManagersComponent},
            {path: 'employees', component: EmployeesComponent},
            {path: 'dashboard', component: DashboardComponent},
            {path: 'contracts', component: ContractsComponent, canActivate: [NotClientGuard]},
            {path: 'clients', component: ClientsComponent},
            {path: 'users', component: UsersComponent, canActivate: [AdminGuard]},
            {path: 'departments', component: DepartmentsComponent},
            {path: 'associates', component: SalesAssociatesComponent},
            {path: 'profile', component: BaseProfileComponent},
            {path: 'my-contracts', component: ClientContractsComponent, canActivate: [ClientGuard]},
            {path: 'worklog', component: WorkLogComponent, canActivate: [EmployeeGuard]},
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
        ]
    },
    {
        path: 'auth', component: LoginComponent, children: [
            {path: 'login', component: UserAuthComponent},
            {path: 'register', component: RegisterComponent},
            {path: '', redirectTo: 'login', pathMatch: 'full'}
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

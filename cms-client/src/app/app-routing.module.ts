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
import { SupervisedComponent } from './components/role-pages/manager/supervised/supervised.component';
import { ManagerGuard } from './guards/manager.guard';
import { AssignmentComponent } from './components/role-pages/employee/assignment/assignment.component';
import { ClientManagersComponent } from './components/role-pages/client/client-managers/client-managers.component';
import { DeliverablesComponent } from './components/home/deliverables/deliverables.component';

const routes: Routes = [
    {
        path: '', component: HomeComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
            {path: 'dashboard', component: DashboardComponent},
            {path: 'profile', component: BaseProfileComponent},
            {path: 'my-managers', component: ClientManagersComponent, canActivate: [ClientGuard]},
            {path: 'my-contracts', component: ClientContractsComponent, canActivate: [ClientGuard]},
            {path: 'managers', component: ManagersComponent, canActivate: [NotClientGuard]},
            {path: 'employees', component: EmployeesComponent, canActivate: [NotClientGuard]},
            {path: 'contracts', component: ContractsComponent, canActivate: [NotClientGuard]},
            {path: 'deliverables', component: DeliverablesComponent, canActivate: [NotClientGuard]},
            {path: 'clients', component: ClientsComponent, canActivate: [NotClientGuard]},
            {path: 'departments', component: DepartmentsComponent, canActivate: [NotClientGuard]},
            {path: 'associates', component: SalesAssociatesComponent, canActivate: [NotClientGuard]},
            {path: 'worklog', component: WorkLogComponent, canActivate: [EmployeeGuard]},
            {path: 'assignments', component: AssignmentComponent, canActivate: [EmployeeGuard]},
            {path: 'supervised', component: SupervisedComponent, canActivate: [ManagerGuard]},
            {path: 'users', component: UsersComponent, canActivate: [AdminGuard]},
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

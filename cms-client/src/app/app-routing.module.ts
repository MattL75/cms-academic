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

const routes: Routes = [
    {
        path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
        {path: 'managers', component: ManagersComponent},
        {path: 'employees', component: EmployeesComponent},
        {path: 'dashboard', component: DashboardComponent},
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

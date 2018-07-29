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
    MatButtonModule, MatCardModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSidenavModule, MatSnackBarModule, MatSortModule, MatTableModule,
    MatToolbarModule
} from '@angular/material';
import { UserAuthComponent } from './components/login/user-auth/user-auth.component';
import { RegisterComponent } from './components/login/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagersComponent } from './components/home/managers/managers.component';
import { EmployeesComponent } from './components/home/employees/employees.component';
import { SnackbarService } from './services/snackbar.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        UserAuthComponent,
        RegisterComponent,
        ManagersComponent,
        EmployeesComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
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
        MatSnackBarModule
    ],
    providers: [
        AuthService,
        AuthGuard,
        SnackbarService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

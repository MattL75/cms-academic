import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Province } from '../../../models/enums/province.enum';
import { AuthService } from '../../../services/auth.service';
import { Role } from '../../../models/enums/role.enum';
import { SnackbarService } from '../../../services/snackbar.service';
import { Client } from '../../../models/client.model';
import { ClientsService } from '../../../services/entity/clients.service';
import { Department } from '../../../models/department.model';
import { Observable } from 'rxjs';
import { City } from '../../../models/city.model';
import { map, startWith } from 'rxjs/operators';
import { CityService } from '../../../services/entity/city.service';

@Component({
    selector: 'cms-client-profile',
    templateUrl: './client-profile.component.html',
    styleUrls: ['./client-profile.component.scss', '../base-profile/base-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {

    entityForm = new FormGroup({
        id: new FormControl(null, [Validators.required]),
        email_domain: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        province_name: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        postal_code: new FormControl('', [Validators.required]),
        role: new FormControl(Role.CLIENT, [Validators.required]),
        city: new FormControl('', [Validators.required]),
        is_admin: new FormControl(false, [Validators.required])
    });
    provinces = Object.values(Province);
    cities: City[];
    filteredCities: Observable<City[]>;

    constructor(private authService: AuthService, private clientsService: ClientsService, private cityService: CityService, private snackbar: SnackbarService) {
    }

    ngOnInit() {
        this.clientsService.getSpecificClient(this.authService.getCurrentUser().id).subscribe(userArray => {
            const user = userArray[0];
            this.entityForm.controls['id'].setValue(user.id);
            this.entityForm.controls['email_domain'].setValue(user.email_domain);
            this.entityForm.controls['name'].setValue(user.name);
            this.entityForm.controls['province_name'].setValue(user.province_name);
            this.entityForm.controls['address'].setValue(user.address);
            this.entityForm.controls['postal_code'].setValue(user.postal_code);
            this.entityForm.controls['city'].setValue(user.city);
            this.entityForm.controls['role'].setValue(user.role);
            this.entityForm.controls['role'].disable();
            this.entityForm.controls['is_admin'].setValue(this.phpBoolean(user.is_admin));
            this.entityForm.controls['is_admin'].disable();
        });

        this.cityService.getCities().subscribe(cityArray => {
            this.cities = cityArray;
        });

        this.filteredCities = this.entityForm.controls['city'].valueChanges
            .pipe(
                startWith(''),
                map(value => this.cityFilter(value))
            );
    }

    save(): void {
        this.clientsService.updateClient(this.entityForm.value).subscribe((newUser) => {
            this.authService.setUser(newUser);
            this.snackbar.open('Details saved.', 'Success!');
        }, () => {
            this.snackbar.open('Failed to save details.', 'Dismiss');
        });
    }

    private cityFilter(value: string): City[] {
        if (typeof value !== 'string' || !this.cities) {
            return null;
        }
        const filterValue = value.toLowerCase();
        return this.cities.filter(option => option.name.toLowerCase().includes(filterValue));
    }

    phpBoolean(value: boolean): boolean {
        return !!Number(value);
    }
}

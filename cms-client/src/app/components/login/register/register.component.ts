import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Province } from '../../../models/enums/province.enum';
import { Role } from '../../../models/enums/role.enum';
import { City } from '../../../models/city.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CityService } from '../../../services/entity/city.service';

@Component({
  selector: 'cms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../login.component.scss']
})
export class RegisterComponent implements OnInit {

    provinces = Object.values(Province);
    cities: City[];
    filteredCities: Observable<City[]>;

    registerForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.compose([Validators.required, Validators.minLength(5)])]),
        postal_code: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        province_name: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        email_domain: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        role: new FormControl(Role.CLIENT),
        id: new FormControl(null),
        is_admin: new FormControl(false),
    });

    constructor(public auth: AuthService, private cityService: CityService) {
    }

    ngOnInit() {
        this.cityService.getCities().subscribe(cityArray => {
            this.cities = cityArray;
        });

        this.filteredCities = this.registerForm.controls['city'].valueChanges
            .pipe(
                startWith(''),
                map(value => this.cityFilter(value))
            );
    }

    onSubmit() {
        this.auth.register(this.registerForm.value);
    }

    private cityFilter(value: string): City[] {
        if (typeof value !== 'string' || !this.cities) {
            return null;
        }
        const filterValue = value.toLowerCase();
        return this.cities.filter(option => option.name.toLowerCase().includes(filterValue));
    }

}

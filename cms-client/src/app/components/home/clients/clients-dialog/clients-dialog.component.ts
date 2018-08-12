import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from '../../../../models/client.model';
import { Province } from '../../../../models/enums/province.enum';
import { Role } from '../../../../models/enums/role.enum';
import { City } from '../../../../models/city.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CityService } from '../../../../services/entity/city.service';

@Component({
    selector: 'cms-clients-dialog',
    templateUrl: './clients-dialog.component.html',
    styleUrls: ['./clients-dialog.component.scss', '../../home.component.scss']
})
export class ClientsDialogComponent implements OnInit {

    entityForm = new FormGroup({
        id: new FormControl(null),
        email_domain: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        province_name: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        postal_code: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        username: new FormControl(''),
        password: new FormControl(''),
        role: new FormControl(Role.CLIENT),
        is_admin: new FormControl(false)
    });

    cities: City[];
    filteredCities: Observable<City[]>;
    provinces = Object.values(Province);

    constructor(public dialogRef: MatDialogRef<ClientsDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {entity: Client, title: string, action: string, mode: string},
                private cityService: CityService) {
    }

    ngOnInit() {
        this.entityForm.controls['id'].setValue(this.data.entity.id);
        this.entityForm.controls['email_domain'].setValue(this.data.entity.email_domain);
        this.entityForm.controls['name'].setValue(this.data.entity.name);
        this.entityForm.controls['province_name'].setValue(this.data.entity.province_name);
        this.entityForm.controls['address'].setValue(this.data.entity.address);
        this.entityForm.controls['postal_code'].setValue(this.data.entity.postal_code);
        this.entityForm.controls['city'].setValue(this.data.entity.city);
        this.entityForm.controls['username'].setValue(this.data.entity.username);
        this.entityForm.controls['password'].setValue(this.data.entity.password);

        if (this.data.mode === 'add') {
            this.entityForm.controls['username'].setValidators(Validators.required);
            this.entityForm.controls['password'].setValidators(Validators.required);
        }

        this.cityService.getCities().subscribe(cityArray => {
            this.cities = cityArray;
        });

        this.filteredCities = this.entityForm.controls['city'].valueChanges
            .pipe(
                startWith(''),
                map(value => this.cityFilter(value))
            );
    }

    public close(): void {
        this.dialogRef.close();
    }

    public closeSubmit(): void {
        this.dialogRef.close(this.entityForm.value);
    }

    private cityFilter(value: string): City[] {
        if (typeof value !== 'string' || !this.cities) {
            return null;
        }
        const filterValue = value.toLowerCase();
        return this.cities.filter(option => option.name.toLowerCase().includes(filterValue));
    }

}

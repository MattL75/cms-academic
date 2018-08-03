import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from '../../../../models/client.model';
import { Province } from '../../../../models/enums/province.enum';
import { Role } from '../../../../models/enums/role.enum';

@Component({
    selector: 'cms-clients-dialog',
    templateUrl: './clients-dialog.component.html',
    styleUrls: ['./clients-dialog.component.scss', '../../home.component.scss']
})
export class ClientsDialogComponent implements OnInit {

    entityForm = new FormGroup({
        email_domain: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        province: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        role: new FormControl(Role.CLIENT),
        is_admin: new FormControl(false)
    });

    provinces = Object.keys(Province);

    constructor(public dialogRef: MatDialogRef<ClientsDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {entity: Client, title: string, action: string}) {
    }

    ngOnInit() {
        this.entityForm.controls['email_domain'].setValue(this.data.entity.email_domain);
        this.entityForm.controls['name'].setValue(this.data.entity.name);
        this.entityForm.controls['province'].setValue(this.data.entity.province);
        this.entityForm.controls['username'].setValue(this.data.entity.username);
        this.entityForm.controls['password'].setValue(this.data.entity.password);
    }

    public close(): void {
        this.dialogRef.close();
    }

    public closeSubmit(): void {
        this.dialogRef.close(this.entityForm.value);
    }

}

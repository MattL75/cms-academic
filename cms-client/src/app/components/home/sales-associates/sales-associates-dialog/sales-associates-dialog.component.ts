import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../../../models/enums/role.enum';
import { SalesAssociate } from '../../../../models/sales-associate.model';

@Component({
    selector: 'cms-sales-associates-dialog',
    templateUrl: './sales-associates-dialog.component.html',
    styleUrls: ['./sales-associates-dialog.component.scss', '../../home.component.scss']
})
export class SalesAssociatesDialogComponent implements OnInit {

    entityForm = new FormGroup({
        id: new FormControl(null),
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
        username: new FormControl(''),
        password: new FormControl(''),
        role: new FormControl(Role.SALES_ASSOCIATE),
        is_admin: new FormControl('')
    });

    constructor(public dialogRef: MatDialogRef<SalesAssociatesDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {entity: SalesAssociate, title: string, action: string, mode: string}) {
    }

    ngOnInit() {
        this.entityForm.controls['id'].setValue(this.data.entity.id);
        this.entityForm.controls['first_name'].setValue(this.data.entity.first_name);
        this.entityForm.controls['last_name'].setValue(this.data.entity.last_name);
        this.entityForm.controls['username'].setValue(this.data.entity.username);
        this.entityForm.controls['password'].setValue(this.data.entity.password);
        this.entityForm.controls['is_admin'].setValue(this.data.entity.is_admin);

        if (this.data.mode === 'add') {
            this.entityForm.controls['username'].setValidators(Validators.required);
            this.entityForm.controls['password'].setValidators(Validators.required);
        }
    }

    public close(): void {
        this.dialogRef.close();
    }

    public closeSubmit(): void {
        this.dialogRef.close(this.entityForm.value);
    }

}

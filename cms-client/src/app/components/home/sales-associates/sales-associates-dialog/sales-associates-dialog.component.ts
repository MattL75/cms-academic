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
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        role: new FormControl(Role.SALES_ASSOCIATE),
        is_admin: new FormControl(false)
    });

    constructor(public dialogRef: MatDialogRef<SalesAssociatesDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {entity: SalesAssociate, title: string, action: string}) {
    }

    ngOnInit() {
        this.entityForm.controls['first_name'].setValue(this.data.entity.first_name);
        this.entityForm.controls['last_name'].setValue(this.data.entity.last_name);
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

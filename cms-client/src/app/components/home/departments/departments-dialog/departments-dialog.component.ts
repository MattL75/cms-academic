import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Department } from '../../../../models/department.model';

@Component({
    selector: 'cms-departments-dialog',
    templateUrl: './departments-dialog.component.html',
    styleUrls: ['./departments-dialog.component.scss', '../../home.component.scss']
})
export class DepartmentsDialogComponent implements OnInit {

    entityForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        service_type: new FormControl('', [Validators.required]),
    });

    constructor(public dialogRef: MatDialogRef<DepartmentsDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {entity: Department, title: string, action: string}) {
    }

    ngOnInit() {
        this.entityForm.controls['name'].setValue(this.data.entity.name);
        this.entityForm.controls['service_type'].setValue(this.data.entity.service_type);
    }

    public close(): void {
        this.dialogRef.close();
    }

    public closeSubmit(): void {
        this.dialogRef.close(this.entityForm.value);
    }

}

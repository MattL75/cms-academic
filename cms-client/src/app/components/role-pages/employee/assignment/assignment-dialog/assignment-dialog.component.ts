import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../../services/auth.service';
import { Assignment } from '../../../../../models/assignment.model';

@Component({
    selector: 'cms-assignment-dialog',
    templateUrl: './assignment-dialog.component.html',
    styleUrls: ['./assignment-dialog.component.scss', '../../../../home/home.component.scss']
})
export class AssignmentDialogComponent implements OnInit {

    entityForm = new FormGroup({
        id: new FormControl(null),
        employee_id: new FormControl('', [Validators.required]),
        contract_id: new FormControl('', [Validators.required]),
        is_active: new FormControl('', [Validators.required])
    });

    constructor(public dialogRef: MatDialogRef<AssignmentDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {entity: Assignment, title: string, action: string}, private auth: AuthService) {
    }

    ngOnInit() {
        this.entityForm.controls['id'].setValue(this.data.entity.id);
        this.entityForm.controls['employee_id'].setValue(this.data.entity.employee_id);
        this.entityForm.controls['contract_id'].setValue(this.data.entity.contract_id);
        this.entityForm.controls['is_active'].setValue(this.data.entity.is_active);
    }

    public close(): void {
        this.dialogRef.close();
    }

    public closeSubmit(): void {
        this.dialogRef.close(this.entityForm.value);
    }

}

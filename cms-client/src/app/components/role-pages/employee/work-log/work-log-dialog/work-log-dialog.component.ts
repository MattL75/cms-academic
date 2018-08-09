import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WorkLog } from '../../../../../models/work-log.model';
import { AuthService } from '../../../../../services/auth.service';

@Component({
    selector: 'cms-work-log-dialog',
    templateUrl: './work-log-dialog.component.html',
    styleUrls: ['./work-log-dialog.component.scss', '../../../../home/home.component.scss']
})
export class WorkLogDialogComponent implements OnInit {

    entityForm = new FormGroup({
        date_worked: new FormControl('', [Validators.required]),
        hours_worked: new FormControl('', [Validators.required]),
        assignment_id: new FormControl('', [Validators.required]),
        employee_id: new FormControl('', [Validators.required])
    });

    constructor(public dialogRef: MatDialogRef<WorkLogDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {entity: WorkLog, title: string, action: string}, private auth: AuthService) {
    }

    ngOnInit() {
        this.entityForm.controls['date_worked'].setValue(this.data.entity.date_worked);
        this.entityForm.controls['hours_worked'].setValue(this.data.entity.hours_worked);
        this.entityForm.controls['assignment_id'].setValue(this.data.entity.assignment_id);
        this.entityForm.controls['employee_id'].setValue((this.auth.getCurrentUser().id));
    }

    public close(): void {
        this.dialogRef.close();
    }

    public closeSubmit(): void {
        this.dialogRef.close(this.entityForm.value);
    }

}

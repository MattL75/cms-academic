import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WorkLog } from '../../../../../models/work-log.model';
import { AuthService } from '../../../../../services/auth.service';
import { Assignment } from '../../../../../models/assignment.model';
import { AssignmentService } from '../../../../../services/entity/assignment.service';
import { Contract } from '../../../../../models/contract.model';
import { ContractsService } from '../../../../../services/entity/contracts.service';

@Component({
    selector: 'cms-work-log-dialog',
    templateUrl: './work-log-dialog.component.html',
    styleUrls: ['./work-log-dialog.component.scss', '../../../../home/home.component.scss']
})
export class WorkLogDialogComponent implements OnInit {

    entityForm = new FormGroup({
        id: new FormControl(null),
        date_worked: new FormControl('', [Validators.required]),
        hours_worked: new FormControl('', [Validators.compose([Validators.required, Validators.max(24), Validators.min(0)])]),
        assignment_id: new FormControl('', [Validators.required]),
        employee_id: new FormControl('', [Validators.required])
    });

    assignments: Assignment[];
    contracts: Contract[];

    constructor(public dialogRef: MatDialogRef<WorkLogDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {entity: WorkLog, title: string, action: string}, private auth: AuthService,
                private assignService: AssignmentService, private contractsService: ContractsService) {
    }

    ngOnInit() {
        this.entityForm.controls['id'].setValue(this.data.entity.id);
        this.entityForm.controls['date_worked'].setValue(this.data.entity.date_worked);
        this.entityForm.controls['hours_worked'].setValue(this.data.entity.hours_worked);
        this.entityForm.controls['assignment_id'].setValue(this.data.entity.assignment_id);
        this.entityForm.controls['employee_id'].setValue(this.auth.getCurrentUser().id);

        this.assignService.getAssignmentsForEmployee(this.auth.getCurrentUser().id).subscribe(assigns => {
            this.assignments = assigns;
        });

        this.contractsService.getContracts().subscribe(conts => {
            this.contracts = conts;
        });
    }

    public close(): void {
        this.dialogRef.close();
    }

    public closeSubmit(): void {
        this.dialogRef.close(this.entityForm.value);
    }

    getContractNameFromAssignId(contId: number): string | undefined {
        if (!this.contracts || !this.assignments) {
            return undefined;
        }
        const result = this.contracts.find(x => x.id === contId);
        return result ? result.name : undefined;
    }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'cms-managers-dialog',
    templateUrl: './managers-dialog.component.html',
    styleUrls: ['./managers-dialog.component.scss']
})
export class ManagersDialogComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<ManagersDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {manager: Manager, title: string, action: string}) {
    }

    ngOnInit() {
    }

    public close(): void {
        this.dialogRef.close();
    }

    public checkValid(): boolean {
        return this.data.manager.first_name.length > 0 && this.data.manager.last_name.length > 0 && this.data.manager.email.length > 0;
    }

}

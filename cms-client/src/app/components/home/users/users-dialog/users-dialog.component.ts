import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../models/user.model';
import { Role } from '../../../../models/enums/role.enum';

@Component({
    selector: 'cms-users-dialog',
    templateUrl: './users-dialog.component.html',
    styleUrls: ['./users-dialog.component.scss', '../../home.component.scss']
})
export class UsersDialogComponent implements OnInit {

    entityForm = new FormGroup({
        id: new FormControl(null),
        username: new FormControl('', [Validators.required]),
        role: new FormControl('', [Validators.required]),
        is_admin: new FormControl('', [Validators.required]),
    });

    roles = Object.keys(Role);

    constructor(public dialogRef: MatDialogRef<UsersDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {entity: User, title: string, action: string}) {
    }

    ngOnInit() {
        this.entityForm.controls['id'].setValue(this.data.entity.id);
        this.entityForm.controls['username'].setValue(this.data.entity.username);
        this.entityForm.controls['role'].setValue(this.data.entity.role);
        this.entityForm.controls['is_admin'].setValue(this.data.entity.is_admin);
    }

    public close(): void {
        this.dialogRef.close();
    }

    public closeSubmit(): void {
        this.dialogRef.close(this.entityForm.value);
    }

}

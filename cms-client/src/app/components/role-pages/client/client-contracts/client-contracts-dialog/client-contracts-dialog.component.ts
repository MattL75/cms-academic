import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'cms-client-contracts-dialog',
    templateUrl: './client-contracts-dialog.component.html',
    styleUrls: ['./client-contracts-dialog.component.scss', '../../../../home/home.component.scss']
})
export class ClientContractsDialogComponent implements OnInit {

    entityForm = new FormGroup({
        rating: new FormControl('', [Validators.required]),
    });

    constructor(public dialogRef: MatDialogRef<ClientContractsDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {rating: number, title: string, action: string}) {
    }

    ngOnInit() {
        this.entityForm.controls['rating'].setValue(this.data.rating);
    }

    public close(): void {
        this.dialogRef.close();
    }

    public closeSubmit(): void {
        this.dialogRef.close(this.entityForm.controls['rating'].value);
    }

}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {

    private config = {duration: 3000};

    constructor(private snackbar: MatSnackBar) {}

    open(message: string, action: string = 'Dismiss', time: number = 3000) {
        this.snackbar.open(message, action, {duration: time});
    }
}

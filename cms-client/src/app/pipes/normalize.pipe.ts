import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'normalize'
})
export class NormalizePipe implements PipeTransform {

    transform(value: string, args?: any): any {
        if (!value) {
            return 'No assigned value.';
        }
        value = value.toLocaleLowerCase();
        const newValue = value.replace(/_/g, ' ');

        const split = newValue.split(' ');
        let returnStr = '';
        split.forEach((str, index) => {
            returnStr = returnStr.concat(str.charAt(0).toLocaleUpperCase() + str.slice(1));
            if (index < split.length - 1) {
                returnStr = returnStr.concat(' ');
            }
        });

        return returnStr;
    }
}

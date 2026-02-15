import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dash',
})
export class DashPipe implements PipeTransform {
    transform(value: string | number | null | undefined): string {
        if (value === null || value === undefined || value === '' || value === 0 || value === '0') {
            return '—';
        }
        return value.toString();
    }
}

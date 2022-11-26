import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'roundTen' })
export class RoundTenPipe implements PipeTransform {
    transform(value: number): number {
        return Math.round(value / 10) * 10;
    }
}
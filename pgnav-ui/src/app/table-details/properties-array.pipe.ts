import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'propertiesArray'
})
export class PropertiesArrayPipe implements PipeTransform {

  transform(value: any) {
    const values = [];

    for (const key of Object.keys(value)) {
      values.push({
        key,
        value: value[key]
      });
    }
    return values;
  }
}

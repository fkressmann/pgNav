import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tablesearch'
})
export class TableSearchPipe implements PipeTransform {

  /**
   * takes an array of objects and a searchTerm and filters the array by checking
   * whether the search term is included in any of the properties
   */
  transform(items: any[], searchTerm: string): any {
    if (searchTerm && searchTerm.length > 0) {
      // return all that have property including the search string
      return items.filter(item => this.getPropertyString(item).includes(searchTerm.toLowerCase()));
    } else {
      return items;
    }
  }

  /**
   * concat all the properties of the item into one giant string
   * which is then used by the pipe to compare with the search string
   * @param item: single entry of the items array passed to the pipe
   */
  private getPropertyString(item: any) {
    // if the item is actually an object, loop through its properties
    if (typeof item === 'object') {
      let propertyString = '';
      for (const key of Object.keys(item)) {
        // check for null values
        if (item[key]) {
          // recursiveley check for nested object structures
          if (typeof item[key] === 'object') {
            propertyString = propertyString + this.getPropertyString(item[key]);
          } else {
            // append the lower string value of the key
            const value = item[key].toString().toLowerCase();
            propertyString = propertyString + value;
          }
        }
      }
      return propertyString;
    } else { // if the item is a primitive data type, just return it as a string
      return item.toString();
    }
  }
}

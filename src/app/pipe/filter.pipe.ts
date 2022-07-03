import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], term: String): any {
    console.log('term', term);
  
    return term 
        ? items.filter(item => item.VBELN.indexOf(term) !== -1)
        : items;
  }

}

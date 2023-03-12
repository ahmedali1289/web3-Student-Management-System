import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter'
  })
  export class FilterPipe implements PipeTransform {
    transform(value: any[], searchText: string): any[] {
        if (!searchText) {
          return value;
        }
      
        searchText = searchText?.toLowerCase();
      
        const filteredRows = value?.filter(item => {
          return (item?.name?.toLowerCase()?.includes(searchText) || JSON?.stringify(item?.age)?.toLowerCase()?.includes(searchText) || JSON?.stringify(item?.number)?.toLowerCase()?.includes(searchText) || JSON?.stringify(item?.id)?.toLowerCase()?.includes(searchText));
        });
        console.log(filteredRows);
        if (filteredRows?.length == 0) {
            return [];
          }
          return filteredRows;
      }
  }
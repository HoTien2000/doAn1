import { Pipe } from "@angular/core";

@Pipe({
    name: 'searchPipe'
})
export class SearchPipe {
    constructor() {}
    transform(value: string, stringLimit: number): any {
      if(value.length > stringLimit) value = value.substring(0,stringLimit)+'...';
      return value;
    }
}

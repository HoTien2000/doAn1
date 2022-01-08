import { Injectable, Pipe } from "@angular/core";

@Pipe({
    name: 'paymentPipe'
})
@Injectable()
export class PaymentPipe {
    constructor() {}
    transform(value: string, stringLimit: number): any {
      if(value.length > stringLimit) value = value.substring(0,stringLimit)+'...';
      return value;
    }
}

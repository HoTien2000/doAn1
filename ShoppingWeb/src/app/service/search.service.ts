import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private behaviorSubject = new BehaviorSubject({});
  currentData = this.behaviorSubject.asObservable();
  

  constructor() { }

  changeData(data:any) {
    this.behaviorSubject.next(data);
  }
}

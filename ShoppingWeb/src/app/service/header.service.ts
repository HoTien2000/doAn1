import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private behaviorSubject = new BehaviorSubject('');
  currentData = this.behaviorSubject.asObservable();
  

  constructor() { }

  changeData(data: string) {
    this.behaviorSubject.next(data);
  }
}

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  user$ = new Subject();
  
  public setUser(user: User){
    this.user$.next(user);
  }
  
  public getUser() : Observable<any>{
    return this.user$.asObservable();
  }
}

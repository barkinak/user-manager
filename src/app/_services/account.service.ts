import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor() { }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }
}

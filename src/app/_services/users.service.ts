import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, take, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from '../_models/user';
import userSeedData from '../data/UserSeedData.json';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  baseUrl = environment.apiUrl;
  
  // dummy data for testing - can be deleted later
  //users: User[] = userSeedData as User[];
  
  private _users = new BehaviorSubject<User[]>([]);
  users$ = this._users.asObservable();
  
  private usersUrl = 'api/users';

  constructor(private http: HttpClient) {
    //this._users.next(this.users);
  }
  
  // Get all users
  getUsers(): Observable<User[]> {
    const url = `${this.baseUrl}users`;
    console.log(url);
    return this.http.get<User[]>(url)
      .pipe(
        tap(data => {
          console.log(JSON.stringify(data))
          this._users.next(data);
        }),
        catchError(this.handleError)
      );
  }
  
  // Get user by id
  getUserById(id: number): Observable<User> {
    const url = `${this.baseUrl}users/${id}`;
    return this.http.get<User>(url)
      .pipe(
        tap(data => console.log('getUser: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  // Add user
  createUser(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    user.id = null as any;
    return this.http.post<User>(this.usersUrl, user, { headers })
      .pipe(
        tap(data => console.log('createUser: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  // Delete user
  deleteUser(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete<User>(url, { headers })
      .pipe(
        tap(data => console.log('deleteUser: ' + id)),
        catchError(this.handleError)
      );
  }

  // Edit user
  updateUser(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.usersUrl}/${user.id}`;
    return this.http.put<User>(url, user, { headers })
      .pipe(
        tap(() => console.log('updateUser: ' + user.id)),
        // Return the user on an update
        map(() => user),
        catchError(this.handleError)
      );
  }

  private handleError(err): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
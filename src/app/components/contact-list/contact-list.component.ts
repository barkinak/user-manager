import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { User } from 'src/app/_models/user';
import { ListService } from 'src/app/_services/list.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  users: User[] = [];
  errorMessage: string;

  constructor(
    public listService: ListService,
    public usersService: UsersService) { 
    //this.usersService.users$.pipe(take(1)).subscribe(users => this.users = users);
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe({
      next: users => {
        this.users = users;
      },
      error: err => this.errorMessage = err
    });
  }

  public setSelected(user: User){
    this.listService.setUser(user);
  }

}

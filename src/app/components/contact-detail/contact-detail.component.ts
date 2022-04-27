import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { User } from 'src/app/_models/user';
import { ListService } from 'src/app/_services/list.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {
  snapshot: any;
  userId: number;
  user: User;
  selectedUser: User;
  errorMessage: string;

  constructor(
    public listService: ListService,
    private usersService: UsersService,
    private route: ActivatedRoute) { 
      this.snapshot = route.snapshot;
      //this.usersService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.userId = this.snapshot.paramMap.get('id');
    this.getUser(this.userId);
    console.log('test');
    /*
    // get user from list service
    this.listService.getUser().subscribe(user=>{
      console.log("user ---> ", user);
      this.selectedUser = user;
    });
    */
  }

  getUser(id: number): void {
    this.usersService.getUserById(id)
    .subscribe({
      next: (user: User) => {this.user = user},
      error: err => this.errorMessage = err
    });
  }
}

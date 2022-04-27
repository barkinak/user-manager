import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { User } from 'src/app/_models/user';
import { ListService } from 'src/app/_services/list.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {
  user: User;
  errorMessage: string;

  constructor(
    public listService: ListService,
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute) { 
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      this.getUser(param);
    }
  }

  editUser(): void {
    this.router.navigateByUrl('/useredit/' + this.user.id);
  }

  getUser(id: string): void {
    this.usersService.getUserById(id)
    .subscribe({
      next: (user: User) => {this.user = user},
      error: err => this.errorMessage = err
    });
  }

  deleteUser(id: string): void {
    if (confirm(`Are you sure to delete user: ${this.user.firstname}?`)) {
      this.usersService.deleteUser(id)
        .subscribe({
          next: () => {
            this.onSaveComplete()
          },
          error: err => this.errorMessage = err
        });
    }
    this.usersService.deleteUser(id);
  }
  
  onSaveComplete(): void {
    this.usersService.getUsers().subscribe({
      next: () => {
        console.log('Delete complete..');
        this.router.navigateByUrl('/userdetail/');
      }
    });
  }
}

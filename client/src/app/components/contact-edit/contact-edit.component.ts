import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { User } from 'src/app/_models/user';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  editedUser: User;
  errorMessage: string;
  
  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      this.getUser(param);
    }
  }

  getUser(id: string): void {
    this.usersService.getUserById(id)
    .subscribe({
      next: (user: User) => {this.user = user},
      error: err => this.errorMessage = err
    });
  }

  onEditUser() {
    console.log('Edit user clicked!');
    this.usersService.updateUser(this.user)
    .subscribe({
      next: x =>{
        this.onSaveComplete();
        this.router.navigateByUrl('/home/userdetail/' + this.user.id);
      }
    })
  }

  onCancel() {
    this.router.navigateByUrl('/home/userdetail/' + this.user.id);
  }

  onSaveComplete(): void {
    this.usersService.getUsers().subscribe({
      next: () => {
        console.log('Delete complete..');
        this.router.navigateByUrl('/home/userdetail/');
      }
    });
  }
}

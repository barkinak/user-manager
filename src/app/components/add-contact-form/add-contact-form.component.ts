import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { User } from 'src/app/_models/user';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-add-contact-form',
  templateUrl: './add-contact-form.component.html',
  styleUrls: ['./add-contact-form.component.scss']
})
export class AddContactFormComponent implements OnInit {
  user: User;
  createUserForm: FormGroup;
  errorMessage = '';

  constructor(
    private dialogRef: MatDialogRef<AddContactFormComponent>,
    private usersService: UsersService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      dateOfBirth: ['', [Validators.required]]
    });
  }

  onSaveUser() {
    if (this.createUserForm.valid) {
      let user: User;
      user = this.createUserForm.value;
      user.id = Guid.create().toString();

      this.usersService.createUser(user)
            .subscribe({
              next: x => {
                console.log(x);
                this.onComplete();
                this.router.navigateByUrl('/userdetail/');
              },
              error: err => this.errorMessage = err
            });

    } else {
      this.errorMessage = 'Please correct validation errors.';
    }
    this.dialogRef.close(null);
  }

  dismiss() {
    this.dialogRef.close(null);
  }

  onComplete() {
    this.usersService.getUsers().subscribe({
      next: () => {
        this.router.navigateByUrl('/userdetail/');
      }
    });
  }

}

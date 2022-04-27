import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/_models/user';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-add-contact-form',
  templateUrl: './add-contact-form.component.html',
  styleUrls: ['./add-contact-form.component.scss']
})
export class AddContactFormComponent implements OnInit {
  model: any = {}
  hide = true;
  user: User;
  createUserForm: FormGroup;
  validationErrors: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddContactFormComponent>,
    private usersService: UsersService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.intitializeForm();
  }

  intitializeForm() {
    this.createUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  addUser() {
    this.dialogRef.close(null);
  }

  dismiss() {
    this.dialogRef.close(null);
  }

}

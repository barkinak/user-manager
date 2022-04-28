import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    this.router.navigateByUrl('/home');
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }
  @Output() submitEM = new EventEmitter();
  @Input() error: string | null;
}

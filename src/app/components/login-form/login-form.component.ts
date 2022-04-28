import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  model: any = {}

  constructor(
    public accountService: AccountService,
    private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/home');
    })
  }
}

import { Component, OnInit } from '@angular/core';
import userSeedData from '../../data/UserSeedData.json';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  users: User[] = userSeedData as User[];
  constructor() { }

  ngOnInit(): void {
  }

}

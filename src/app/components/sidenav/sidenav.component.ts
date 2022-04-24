import { Component, OnInit } from '@angular/core';
import userSeedData from '../../data/UserSeedData.json';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isDarkTheme: boolean = false;
  showFiller = false;
  users: User[] = userSeedData as User[];

  constructor() { }

  ngOnInit(): void {
  }

}

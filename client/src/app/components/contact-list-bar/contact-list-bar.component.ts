import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddContactFormComponent } from '../add-contact-form/add-contact-form.component';

@Component({
  selector: 'app-contact-list-bar',
  templateUrl: './contact-list-bar.component.html',
  styleUrls: ['./contact-list-bar.component.scss']
})
export class ContactListBarComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openAddContactDialog(): void {
    let dialogRef = this.dialog.open(AddContactFormComponent, {
      width: '750px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result)

      if (result) {
        console.log('Navigate to detail');
        //this.router.navigate(['/contactdetail', result.id]);
      }
    })
  }

}

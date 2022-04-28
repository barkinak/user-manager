import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

const routes: Routes = [
  { path: '', component: LoginFormComponent },
  { 
    path: 'home', component: SidenavComponent ,
    children: [
      { path: 'userdetail', component: ContactDetailComponent },
      { path: 'userdetail/:id', component: ContactDetailComponent},
      { path: 'useredit/:id', component: ContactEditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
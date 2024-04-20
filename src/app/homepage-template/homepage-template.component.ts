import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faBuilding, faLongArrowAltUp, faPersonRifle, faPlus, faSignOut, faTasks, faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-homepage-template',
  templateUrl: './homepage-template.component.html',
  styleUrls: ['./homepage-template.component.css']
})
export class HomepageTemplateComponent {
  fabuilding = faBuilding;
  faprofile = faUserTie;
  fajob = faTasks;
  fauser = faUser;
  falogout = faSignOut;
  constructor(private router: Router) { }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login')
  }


}

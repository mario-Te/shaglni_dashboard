import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shaglni-dashboard';
  directSite: string = 'ltr'
  constructor(private translate: TranslateService) {
    translate.use(localStorage.getItem('LANGUAGE') || "en")
    translate.setDefaultLang(localStorage.getItem('LANGUAGE') || "en");
    if (localStorage.getItem("LANGUAGE") === 'ar') {
      this.directSite = 'rtl'
    }
  }
}

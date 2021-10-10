import { Component, ɵɵelementContainerStart } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'inTview';
  showNavBar: boolean = true;
  isMobile: boolean = false;
  toobarTitle: string = "";

  constructor( private router: Router,
              private translate: TranslateService) {
    translate.setDefaultLang('es');
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.setToolbarTitle(val.url);
        if (val.url === '/login') {
          this.showNavBar = false;
        } else {
          this.showNavBar = true;
        }
      }
    });
  }

  doLogout() {
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  async setToolbarTitle(title: string) {
    if (title.includes('login')) {
      this.toobarTitle = await this.translate.get("toolbar.login").toPromise();
    } else if (title.includes('dashboard')) {
      this.toobarTitle = await this.translate.get("toolbar.business").toPromise();
    }
  }
}

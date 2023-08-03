import { Component } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { CookieManageService } from 'src/app/services/cookie-manage.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  usertoken: any;
  decodedToken: any;

  constructor(private cookieService: CookieManageService) { }

  ngOnInit() {
    this.usertoken = sessionStorage.getItem("token");

    if (this.usertoken) {
      this.decodedToken = jwt_decode(this.usertoken);
      if (this.decodedToken) {
        var roles = this.decodedToken.Roles;
        if (roles) {
          if (roles.includes('admin')) this.cookieService.setRole('true');
          else this.cookieService.setRole('false');
        }
        var uid = this.decodedToken.UserId;
        if(uid){
          this.cookieService.setUserId(uid);
        }
      }
    }
  }

}

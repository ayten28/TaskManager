import { Component, ɵsetAlternateWeakRefImpl } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { CookieManageService } from 'src/app/services/cookie-manage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password!: string;
  token: string = '';
  notificationHeader: string ='';
  notificationMsg: string ='';
  notificationType: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router, private apiService: ApiService,
    private cookieService: CookieManageService) { }

  SignIn() {
    if (!this.username || !this.password) {
      // 
    }
    else {
      let body ={        
          "userName" : this.username,
          "password": this.password
        }  
      this.apiService.post(`userauthentication/login`, body)
      .subscribe(
        (result: any) => {    
          if(result.code == 2000)
          {
            var token = result.data.token;
            sessionStorage.setItem("token", token);
            this.cookieService.setAuth(token);
            this.router.navigate(['/main']);
          }
          else if(result.code == 2005)
          {
            this.setNotification('Error!', 'Unauthorized', 'danger');
            console.log("Unauthorized");
          }
          else 
          {
            this.setNotification('Error!', result.message, 'danger');
            console.log("error");
          }
      },error => {
        this.setNotification('Error!', error.error, 'danger');
      }
      
      );
    }
  }

  setNotification(header: string, message: string, type: string)
  {
    this.notificationType = type;
    this.notificationMsg = message;
    this.notificationHeader = header;
  }
}

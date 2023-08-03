import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IgetUserInfoDtoModel } from 'src/app/models/getUserInfoDto';
import { ApiService } from 'src/app/services/api.service';
import { CookieManageService } from 'src/app/services/cookie-manage.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {
  userId: string | null = "";
  currentUser: string | null = "";
  user: IgetUserInfoDtoModel = {
    id: '',
    userName: '',
    normalizedUserName: '',
    email: '',
    normalizedEmail: '',
    emailConfirmed: true,
    passwordHash: '',
    securityStamp: '',
    concurrencyStamp: '',
    phoneNumber: '',
    phoneNumberConfirmed: false,
    twoFactorEnabled: false,
    lockoutEnd: new Date(),
    lockoutEnabled: false,
    accessFailedCount: 0,
    firstName: '',
    lastName: '',
    position: '',
    gender: ''
  };
  gender: string = '';
  notificationHeader: string = '';
  notificationMsg: string = '';
  notificationType: string = '';
  changePswdVisible: boolean= true;

  constructor(
    private route: ActivatedRoute,
    private router: Router, private apiService: ApiService,
    private cookieservice: CookieManageService) {
    this.userId = this.route.snapshot.paramMap.get('id');
    if(this.userId)this.getClientData(this.userId);

    this.currentUser = this.cookieservice.getUserId();
    this.changePswdVisible = (this.currentUser != this.userId);
   
  }

  UpdateInfo() {
    this.router.navigate(['/main/updateuser/' + this.userId]);
  }

  Cancel() {
    this.router.navigate(['/main/users']);
  }

  getClientData(userId: string) {
    this.apiService.get(`userauthentication/${userId}`)
      .subscribe((result: any) => {
        if (result.code == 2000) {          
          this.user = result.data;
          this.gender = result.data.gender == 'f' ? 'Female' : 'Male';
        } else if (result.code == 2005) {
          this.setNotification('Error.', result.message, 'danger');
        }
        else {
          this.setNotification('Failed.', result.message, 'danger');
        }
      }, error => {
        if (error.error.status == 401)
          this.setNotification('Error!', 'Unauthorized', 'danger');
      }
      );
  }

  setNotification(header: string, message: string, type: string) {
    this.notificationType = type;
    this.notificationMsg = message;
    this.notificationHeader = header;
  }

  ChangePaswd(){ debugger
    this.router.navigate(['/main/updatepassword/' + this.userId]);
  }
  
}

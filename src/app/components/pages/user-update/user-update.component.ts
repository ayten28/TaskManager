import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IgetUserInfoDtoModel } from 'src/app/models/getUserInfoDto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {
  userId: string | null = "";
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
  notificationHeader: string = '';
  notificationMsg: string = '';
  notificationType: string = '';

  updateForm: any;
  submitted: boolean | undefined;
  phoneValid: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,  private apiService: ApiService  ) {
      this.userId = this.route.snapshot.paramMap.get('id');
      if(this.userId) this.getClientData(this.userId);

      this.updateForm = new FormGroup({
        firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        position: new FormControl('', [Validators.required]),
        gender: new FormControl('', [Validators.required])
      });
    }


  UpdateUserInfo(){
    this.setNotification('','','');
    this.submitted = true;
    this.phoneValid = false;
    const phoneNumber = this.user.phoneNumber;
    const phoneMobNumberRegex = /^[0-9]{9}$/;
    if (phoneNumber) this.phoneValid = !phoneMobNumberRegex.test(phoneNumber);  


    if (this.updateForm.status == 'VALID' && !this.phoneValid)
    {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'text/plain');
      const httpOptions = { headers: headers };

      let body =
      {
        "firstName": this.user.firstName,
        "lastName": this.user.lastName,
        "phoneNumber": this.user.phoneNumber,
        "position": this.user.position,
        "gender": this.user.gender
      }
      debugger
      this.apiService.post(`userauthentication/update/${this.userId}`, body)
        .subscribe(
          (result: any) => {
            if (result.code == 2000) {

               this.router.navigate(['main/userinfo/' + this.userId]).then(() => {
                window.location.reload()
              });
            }
            else if (result.code == 2005) {
              this.setNotification('Error!', result.message, 'danger');
              console.log("Unauthorized");
            }
            else {
              this.setNotification('Error!', result.message, 'danger');
              console.log("error");
            }
          }, error => {
            if (error.error.status == 401){
              this.setNotification('Error!', 'Unauthorized', 'danger');
              console.log('Unathirized');}
          }
        );
    }
    //this.router.navigate(['/main/userinfo']);
  }

  

  Cancel(){
    this.router.navigate(['/main/userinfo/' + this.userId]);
  }

  getClientData(userId: string) {
    this.apiService.get(`userauthentication/${userId}`)
      .subscribe((result: any) => {
        if (result.code == 2000) {          
          this.user = result.data;
          
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

  uploadPhoto(event: any){
    debugger
    var aaaa = event.target.files[0];
    console.log(aaaa);

  }
}

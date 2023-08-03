import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUserAddDtoModel } from 'src/app/models/userAddDto';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: IUserAddDtoModel = {
    firstName: '',
    lastName: '',
    position: '',
    userName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    password: ''
  };
  userId : string = '';

  registerForm: any;
  submitted: boolean | undefined;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  passwordPattern = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
  phoneValid: boolean = false;
  passwordMatch: boolean = false;
  confirmpassword: string = '';

  notificationHeader: string ='';
  notificationMsg: string ='';
  notificationType: string = '';

  constructor(private router: Router,  private apiService: ApiService) {
    this.registerForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      gender: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern),]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern), ])
    });
  }
 
  CreateUser() {
    this.setNotification('','','');

    this.submitted = true;
    this.phoneValid = false;
    const phoneNumber = this.user.phoneNumber;
    const phoneMobNumberRegex = /^[0-9]{9}$/;
    if (phoneNumber) this.phoneValid = !phoneMobNumberRegex.test(phoneNumber);  
    this.passwordMatch = false;
    if (this.user.password != this.confirmpassword) this.passwordMatch = true;

    if (this.registerForm.status == 'VALID' && !this.phoneValid && !this.passwordMatch) {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'text/plain');
      const httpOptions = { headers: headers };

      let body =
      {
        "firstName": this.user.firstName,
        "lastName": this.user.lastName,
        "userName": this.user.userName,
        "password": this.user.password,
        "email": this.user.email,
        "phoneNumber": this.user.phoneNumber,
        "position": this.user.position,
        "gender": this.user.gender
      }
      this.apiService.post(`userauthentication`, body)
        .subscribe(
          (result: any) => {
            if (result.code == 2000) {
              this.userId = result.data.id;
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
            if (error.error.status == 401)
              this.setNotification('Error!', 'Unauthorized', 'danger');
              console.log('Unathirized');
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

  Cancel() {
    this.router.navigate(['/main/users']);
  }
}

import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.css']
})
export class PasswordUpdateComponent {
  userId: string | null = "";
  updatePswdForm: any;
  submitted: boolean | undefined;
  passwordPattern = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
  passwordMatch: boolean = false;

  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  notificationHeader: string = '';
  notificationMsg: string = '';
  notificationType: string = '';

  constructor(private router: Router, private apiService: ApiService,
    private route: ActivatedRoute,) {
      debugger
    this.userId = this.route.snapshot.paramMap.get('id');

    this.updatePswdForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern),]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern),])
    });
  }

  setNotification(header: string, message: string, type: string) {
    this.notificationType = type;
    this.notificationMsg = message;
    this.notificationHeader = header;
  }


  UpdatePassword() {
    this.setNotification('', '', '');
debugger
    this.submitted = true;
    this.passwordMatch = false;
    if (this.newPassword != this.confirmPassword) this.passwordMatch = true;

    console.log(this.passwordMatch);

    if (this.updatePswdForm.status == 'VALID' && !this.passwordMatch) { 

      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'text/plain');
      const httpOptions = { headers: headers };

      let body =
      {
        "currentPassword": this.oldPassword,
        "newPassword": this.newPassword
      }
      this.apiService.post(`userauthentication/changePassword/${this.userId}`, body)
        .subscribe(
          (result: any) => {
            if (result.code == 2000) {
             this.setNotification('Success', 'Your password has been updated!', 'success');
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
              console.log('Unauthorized');
          }
        );
    }

  }

  Cancel(){
    this.router.navigate(['main/userinfo/' + this.userId]).then(() => {
      window.location.reload()
    });
  }
}

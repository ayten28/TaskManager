import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ITaskCreateDto } from 'src/app/models/taskCreateDto';
import { ApiService } from 'src/app/services/api.service';
import { CookieManageService } from 'src/app/services/cookie-manage.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  task: ITaskCreateDto = {
    taskName: '',
    taskDescription: '',
    createdDate: new Date(),
    createUser: '',
    assignUser: ''
  };
  userId: any;
  currentUserId: any;
  cookieUser: any;
  createTaskForm: any;
  submitted: boolean | undefined;
  userValid: boolean = true;

  notificationHeader: string ='';
  notificationMsg: string ='';
  notificationType: string = '';

  constructor(
    private cookieservice: CookieManageService,
    private route: ActivatedRoute,
    private router: Router, private apiService: ApiService) {
      this.cookieUser = this.cookieservice.getUserId();

    this.createTaskForm = new FormGroup({
      taskName: new FormControl('', [Validators.required]),
      taskDescription: new FormControl('', [Validators.required])
    });
  }

  CreateTask() {
    this.submitted = true;

    var a = this.userId;
    if( this.userId ) this.userValid = false;
    if (this.createTaskForm.status == 'VALID' && !this.userValid) {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'text/plain');
      const httpOptions = { headers: headers };

      let body =
      {
        "taskName": this.task.taskName,
        "taskDescription": this.task.taskDescription,
        "createdDate": new Date(),
        "createUser": this.cookieUser,
        "assignUser": this.userId
      }
      this.apiService.post(`tasks/createTask`, body)
        .subscribe(
          (result: any) => {
            if (result.code == 2000) {
              this.userId = result.data.id;
              this.router.navigate(['main/createdtasks/' + this.cookieUser]).then(() => {
                window.location.reload()
              });
            }
            else if (result.code == 2003) {
              this.setNotification('Validation Error!', result.message, 'danger');
              console.log("Unauthorized");
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

  changeUserId(data: any) {
    this.userId = data;
  }

  Cancel(){
    this.router.navigate(['main/createdtasks/' + this.cookieUser]).then(() => {
      window.location.reload()
    });
  }
}

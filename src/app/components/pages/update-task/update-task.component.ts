import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITaskCreateDto } from 'src/app/models/taskCreateDto';
import { ITasksDtoModel } from 'src/app/models/tasksDto';
import { ApiService } from 'src/app/services/api.service';
import { CookieManageService } from 'src/app/services/cookie-manage.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent {
  task: ITasksDtoModel = {
    id: 0,
    taskName: '',
    taskDescription: '',
    createdDate: new Date(),
    createUser: '',
    createUserLogin: '',
    createUserFullName: '',
    isDone: false,
    assignUser: '',
    assignUserLogin: '',
    assignUserFullName: '',
    resolveDate: new Date()
  };
  userId: any;
  currentUserId: any;
  cookieUser: any;
  submitted: boolean | undefined;
  userValid: boolean = true;
  taskId: any;

  notificationHeader: string ='';
  notificationMsg: string ='';
  notificationType: string = '';
  constructor(    
    private route: ActivatedRoute,
    private router: Router, private apiService: ApiService, private cookieservice: CookieManageService, private location: Location ) {
      this.taskId = this.route.snapshot.paramMap.get('id');
      this.getTask(this.taskId);

      this.cookieUser =  this.cookieservice.getUserId();
    }

    UpdateTask(){
      
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'text/plain');
      const httpOptions = { headers: headers };

      let body =
      {
        "taskName": this.task.taskName,
        "taskDescription": this.task.taskDescription,
        "resolveDate": this.task.resolveDate,
        "assignUser": (!this.userId) ? this.currentUserId : this.userId,
        "isDone": this.task.isDone        
      }  
      debugger
      this.apiService.put(`tasks/${this.taskId}`, body)
      .subscribe(
        (result: any) => {
          if (result.code == 2000) {            
            this.router.navigate(['main/taskinfo/' + this.taskId]).then(() => {
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
    
    
    changeUserId(data: any) {
      this.userId = data;
    }

    setNotification(header: string, message: string, type: string)
    {
      this.notificationType = type;
      this.notificationMsg = message;
      this.notificationHeader = header;
    }

    getTask(id: number)
    {      
      this.apiService.get(`tasks/${id}`)
      .subscribe((result: any) => {
        if (result.code == 2000) {          
          this.task = result.data;
          this.currentUserId = result.data.assignUser;
        } else if (result.code == 2005) {
          this.setNotification('Error.', result.message, 'danger');
        }
        else {
          this.setNotification('Failed.', result.message, 'danger');
        }
      }, error => {
        if (error.error.status == 401){}
          this.setNotification('Error!', 'Unauthorized', 'danger');
      }
      )
    }

    Cancel()
    {
      this.location.back();    
      this.router.navigate(['/main/createdtasks/' + this.cookieUser]);
    }

}

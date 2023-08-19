import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITasksDtoModel } from 'src/app/models/tasksDto';
import { ApiService } from 'src/app/services/api.service';
import { CookieManageService } from 'src/app/services/cookie-manage.service';
import { Location } from '@angular/common';
import { ICommentsDto } from 'src/app/models/commentsDto';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.css']
})
export class TaskInfoComponent {
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
  comments!: ICommentsDto[];
  notificationHeader: string = '';
  notificationMsg: string = '';
  notificationType: string = '';
  taskId :any ;
  cookieUser: any;
  resolvationDate: any;
  hideEdit: boolean = true;
  newComment: string = '';
  addcomment: boolean = true;

  constructor(    
    private route: ActivatedRoute,
    private router: Router, private apiService: ApiService, private cookieservice: CookieManageService, private location: Location) {
      this.taskId = this.route.snapshot.paramMap.get('id');
      this.getTask(this.taskId);
      this.getComments(this.taskId);
      this.cookieUser =  this.cookieservice.getUserId();
    }

  setNotification(header: string, message: string, type: string) {
    this.notificationType = type;
    this.notificationMsg = message;
    this.notificationHeader = header;
  }

  getTask(id: number) {
    this.apiService.get(`tasks/${id}`)
      .subscribe((result: any) => {
        if (result.code == 2000) {
          this.task = result.data;
          var dt = result.data.resolveDate;

          if(result.data.resolveDate == "0001-01-01T00:00:00") this.resolvationDate = "";
          else this.resolvationDate = this.task!.resolveDate;

          if(result.data.createUser == this.cookieUser) this.hideEdit = false;
          if(result.data.createUser == this.cookieUser || result.data.assignUser == this.cookieUser)this.addcomment = false;
          
       } else if (result.code == 2005) {
          this.setNotification('Error.', result.message, 'danger');
        }
        else {
          this.setNotification('Failed.', result.message, 'danger');
        }
      }, error => {
        if (error.error.status == 401) { }
        this.setNotification('Error!', 'Unauthorized', 'danger');
      }
      )
  }

  UpdateInfo() { 
    this.router.navigate(['/main/updatetask/' + this.taskId]);
  }

  Cancel() { 
    this.location.back();    
    //this.router.navigate(['/main/createdtasks/' + this.cookieUser]);
  }

  AddComment()
  {
    if(this.newComment){
    let body =
    {
      "taskId": this.taskId,
      "text": this.newComment,
      "createdDate": new Date(),
      "createUser": this.cookieUser
    }
    this.apiService.post(`comments`, body)
      .subscribe(
        (result: any) => {
          if (result.code == 2000) {
            window.location.reload();
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

  getComments(taskId: number )
  {
    this.apiService.get(`comments/${taskId}`)
    .subscribe((result: any) => {
      if (result.code == 2000) {        
        this.comments = result.data;
      } else if (result.code == 2005) {
        console.log(result.message);
        //this.setNotification('Error.', result.message, 'danger');
      }
      else {
        console.log(result.message);
        //this.setNotification('Failed.', result.message, 'danger');
      }
    }, error => {
      if (error.error.status == 401) {
        console.log(error);
       }
       console.log(error);
      //this.setNotification('Error!', 'Unauthorized', 'danger');
    }
    );
  }
}

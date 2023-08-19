import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITasksDtoModel } from 'src/app/models/tasksDto';
import { ApiService } from 'src/app/services/api.service';
import { PopUpService } from '../../controls/pop-up/pop-up.service';

@Component({
  selector: 'app-my-assigned-tasks',
  templateUrl: './my-assigned-tasks.component.html',
  styleUrls: ['./my-assigned-tasks.component.css']
})
export class MyAssignedTasksComponent {
  tasks!: ITasksDtoModel[]; 
  currentUserId: string | null = '';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router, private apiService: ApiService,
    private PopUpSerice: PopUpService) {
      this.currentUserId = this.route.snapshot.paramMap.get('id');
      if(this.currentUserId) this.getTaskList(this.currentUserId);
  }

  getTaskList(id: string) {
    this.apiService.get(`tasks/AssignedTasks/${id}`)
      .subscribe((result: any) => {
        if (result.code == 2000) {
          
          this.tasks = result.data;
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

  Navigate(id: any)
  {
    this.router.navigate(['/main/taskinfo/' + id]);
  }

  Done(id: any)
  {
     this.PopUpSerice.confirm('Mark the task as done?', 'Yes', 'Close', 'lg')
     .then((confirmed) => (confirmed) ? this.UpdateIsDone(id) : console.log('closed'))
     .catch(() => console.log('User dismissed the dialog'));
  }

  UpdateIsDone(id: any)
  {
    debugger
    this.ResolveTask(id);
  }
  
  getTask(id: number)
  {      
    this.apiService.get(`tasks/${id}`)
    .subscribe((result: any) => {
      if (result.code == 2000) {          
        this.task = result.data;
        this.currentUserId = result.data.assignUser;
      } else if (result.code == 2005) {
        console.log(result.message);
        //this.setNotification('Error.', result.message, 'danger');
      }
      else {
        console.log(result.message);
        //this.setNotification('Failed.', result.message, 'danger');
      }
    }, error => {
      if (error.error.status == 401){
        console.log('Unauthorized');
      }
        //his.setNotification('Error!', 'Unauthorized', 'danger');
    }
    )
  }

  ResolveTask(id: any){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'text/plain');
    const httpOptions = { headers: headers };

    debugger
    this.apiService.put(`tasks/ResolveTask/${id}`, null)
    .subscribe(
      (result: any) => {
        if (result.code == 2000) {            
          this.getTaskList(this.currentUserId!);
        }
        else if (result.code == 2003) {
          //this.setNotification('Validation Error!', result.message, 'danger');
          console.log("Unauthorized");
        }
        else if (result.code == 2005) {
          //this.setNotification('Error!', result.message, 'danger');
          console.log("Unauthorized");
        }
        else {
         // this.setNotification('Error!', result.message, 'danger');
          console.log("error");
        }
      }, error => {
        if (error.error.status == 401)
          //this.setNotification('Error!', 'Unauthorized', 'danger');
          console.log('Unathirized');
      }
    );
 }
}

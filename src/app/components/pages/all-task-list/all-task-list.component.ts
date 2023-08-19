import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITasksDtoModel } from 'src/app/models/tasksDto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-all-task-list',
  templateUrl: './all-task-list.component.html',
  styleUrls: ['./all-task-list.component.css']
})
export class AllTaskListComponent {
  tasks!: ITasksDtoModel[]; 

  constructor(
    private route: ActivatedRoute,
    private router: Router, private apiService: ApiService) {
    this.getTaskList();
  }

  getTaskList() {
    this.apiService.get(`tasks`)
      .subscribe((result: any) => {
        if (result.code == 2000) {
          debugger
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

}

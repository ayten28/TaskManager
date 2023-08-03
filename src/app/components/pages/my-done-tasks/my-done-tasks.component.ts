import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITasksDtoModel } from 'src/app/models/tasksDto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-my-done-tasks',
  templateUrl: './my-done-tasks.component.html',
  styleUrls: ['./my-done-tasks.component.css']
})
export class MyDoneTasksComponent {
  tasks!: ITasksDtoModel[]; 
  currentUserId: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router, private apiService: ApiService) {
      this.currentUserId = this.route.snapshot.paramMap.get('id');
      if(this.currentUserId) this.getTaskList(this.currentUserId);
  }

  getTaskList(id: string) {
    this.apiService.get(`tasks/AssignedDoneTasks/${id}`)
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

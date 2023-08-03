import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITasksDtoModel } from 'src/app/models/tasksDto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-my-created-tasks',
  templateUrl: './my-created-tasks.component.html',
  styleUrls: ['./my-created-tasks.component.css']
})
export class MyCreatedTasksComponent {
  slideDownVisible = false;
  tasks!: ITasksDtoModel[]; 
  currentUserId: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router, private apiService: ApiService) {
      this.currentUserId = this.route.snapshot.paramMap.get('id');
      if(this.currentUserId) this.getTaskList(this.currentUserId);
  }

  getTaskList(id: string) {
    this.apiService.get(`tasks/MyTasks/${id}`)
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

  toggleSlideDown() {
       this.slideDownVisible = !this.slideDownVisible;
     }

    EditTask(id: any)
    {
      this.router.navigate(['/main/updatetask/' + id]);
    }

    Navigate(id: any)
    {
      this.router.navigate(['/main/taskinfo/' + id]);
    }
}

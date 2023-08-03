import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CookieManageService } from 'src/app/services/cookie-manage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  currentUserId: string | undefined;
  fullName: string = '';
  userName: string = '';
  Admin: string ='';
  isAdmin: boolean = false;
  constructor(private cookieservice: CookieManageService, private apiService: ApiService, private router: Router ){}
  
  ngOnInit(): void{
    this.currentUserId = this.cookieservice.getUserId();
    this.isAdmin = (this.cookieservice.getRole() == 'true');

    if(this.isAdmin == true) this.Admin = '(Admin)';

    if(this.currentUserId)
    {
      this.apiService.get(`userauthentication/${this.currentUserId}`)
      .subscribe((result: any) => {
        if (result.code == 2000) {
          this.userName = result.data.userName;
          this.fullName = result.data.firstName + ' ' + result.data.lastName;
        }
      });
    }
  }

  MyInfo()
  {
    if(this.currentUserId)
    {
      this.router.navigate(['/main/userinfo/' + this.currentUserId]);
    }
  }

  MyCreatedTasks()
  {
    if(this.currentUserId)
    {
      this.router.navigate(['/main/createdtasks/' + this.currentUserId]);
    }
  }
  
  AssignedToMeTasks()
  {
    if(this.currentUserId)
    {
      this.router.navigate(['/main/assignedtometasks/' + this.currentUserId]);
    }
  }

  MyDoneTasks(){
    if(this.currentUserId)
    {
      this.router.navigate(['/main/donetasks/' + this.currentUserId]);
    }
  }

}

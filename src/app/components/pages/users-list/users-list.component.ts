import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUserModel } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { PopUpService } from '../../controls/pop-up/pop-up.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  constructor(private apiService: ApiService, private router: Router,
    private PopUpSerice: PopUpService) { }
  users!: IUserModel[];

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.apiService.get(`userauthentication/getUsersList`)
      .subscribe((result: any) => {
        if (result.code == 2000) {
          this.users = result.data;
        }
      });
  }

  Navigate(id: any) {
    this.router.navigate(['/main/userinfo/' + id]);
  }

  UpdateUser(id: any) {
    this.router.navigate(['/main/updateuser/' + id]);
  }

  DeleteUser(id: any)
  {
    this.PopUpSerice.confirm('Are you sure you want to delete this user?', 'Yes', 'Close', 'lg')
      .then((confirmed) => (confirmed) ? this.DeleteMethodCall(id) : console.log('closed'))
      .catch(() => console.log('User dismissed the dialog'));
  }

  DeleteMethodCall(id: any)
  {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'text/plain');
    const httpOptions = { headers: headers };

    this.apiService.post(`userauthentication/block/${id}`, null )
      .subscribe(
        (result: any) => {
          if (result.code == 2000) {
            window.location.reload();
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

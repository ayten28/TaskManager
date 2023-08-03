import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IgetUserInfoDtoModel } from 'src/app/models/getUserInfoDto';
import { ApiService } from 'src/app/services/api.service';
import { CookieManageService } from 'src/app/services/cookie-manage.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
    users!: IgetUserInfoDtoModel[]; 
    @Input() _userId: any;//_vipGroupId: any;
    @Output() userIdChange = new EventEmitter<string>();//vipGrpoupIdChange
    cookieUser: any;
    constructor(private cookieservice: CookieManageService,private apiService: ApiService) { 
        
    }

    ngOnInit(): void {
      this.cookieUser = this.cookieservice.getUserId();
      if(this.cookieUser)this.getUserList(this.cookieUser);
    }
  
    getUserList(id: string) {
        this.apiService.get(`userauthentication/getUsersListExceptCurrent/${id}`)
          .subscribe((result: any) => {
            if (result.code == 2000) {
              this.users = result.data;
            }
          });
      }
  
    onModelChange(userId: string) {   
      this.userIdChange.emit(userId);        
    }

}
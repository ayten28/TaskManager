import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login/login.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { SidebarComponent } from './components/controls/sidebar/sidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/pages/register/register.component';
import { UsersListComponent } from './components/pages/users-list/users-list.component';
import { UserInfoComponent } from './components/pages/user-info/user-info.component';
import { UserUpdateComponent } from './components/pages/user-update/user-update.component';
import { PasswordUpdateComponent } from './components/pages/password-update/password-update.component';
import { AllTaskListComponent } from './components/pages/all-task-list/all-task-list.component';
import { MyCreatedTasksComponent } from './components/pages/my-created-tasks/my-created-tasks.component';
import { MyAssignedTasksComponent } from './components/pages/my-assigned-tasks/my-assigned-tasks.component';
import { CreateTaskComponent } from './components/pages/create-task/create-task.component';
import { UpdateTaskComponent } from './components/pages/update-task/update-task.component';
import { MyDoneTasksComponent } from './components/pages/my-done-tasks/my-done-tasks.component';
import { TaskInfoComponent } from './components/pages/task-info/task-info.component';
import { CommentsComponent } from './components/controls/comments/comments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './interceptors/token.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { CookieManageService } from './services/cookie-manage.service';
import { NotificationComponent } from './components/controls/notification/notification.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PopUpComponent } from './components/controls/pop-up/pop-up.component';
import { PopUpService } from './components/controls/pop-up/pop-up.service';
import { PopupService } from '@ng-bootstrap/ng-bootstrap/util/popup';
import { UserListComponent } from './components/controls/user-list/user-list.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', component: LoginComponent},
  { path: 'main', component: MainPageComponent, children: [
    { path: 'users', component: UsersListComponent },
    { path: 'createuser', component: RegisterComponent },
    { path: 'updateuser/:id', component: UserUpdateComponent},
    { path: 'updatepassword/:id', component: PasswordUpdateComponent },
    { path: 'userinfo/:id', component: UserInfoComponent },
    { path: 'createdtasks/:id', component: MyCreatedTasksComponent },
    { path: 'assignedtometasks/:id', component: MyAssignedTasksComponent },
    { path: 'donetasks/:id', component: MyDoneTasksComponent },
    { path: 'taskreport', component: AllTaskListComponent },
    { path: 'newtask', component: CreateTaskComponent },
    { path: 'updatetask/:id', component: UpdateTaskComponent },
    { path: 'taskinfo/:id', component: TaskInfoComponent }
  ]}
  
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    SidebarComponent,
    RegisterComponent,
    UsersListComponent,
    UserInfoComponent,
    UserUpdateComponent,
    PasswordUpdateComponent,
    AllTaskListComponent,
    MyCreatedTasksComponent,
    MyAssignedTasksComponent,
    CreateTaskComponent,
    UpdateTaskComponent,
    MyDoneTasksComponent,
    TaskInfoComponent,
    CommentsComponent,
    NotificationComponent,
    PopUpComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true}),
    HttpClientModule,
    NgxMaskModule.forRoot({showMaskTyped : true }),
    NgbModule
  
  ],
  providers: [ApiService,
    CookieService,
    CookieManageService,
    PopUpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAssignedTasksComponent } from './my-assigned-tasks.component';

describe('MyAssignedTasksComponent', () => {
  let component: MyAssignedTasksComponent;
  let fixture: ComponentFixture<MyAssignedTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyAssignedTasksComponent]
    });
    fixture = TestBed.createComponent(MyAssignedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

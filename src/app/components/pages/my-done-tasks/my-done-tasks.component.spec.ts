import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDoneTasksComponent } from './my-done-tasks.component';

describe('MyDoneTasksComponent', () => {
  let component: MyDoneTasksComponent;
  let fixture: ComponentFixture<MyDoneTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyDoneTasksComponent]
    });
    fixture = TestBed.createComponent(MyDoneTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

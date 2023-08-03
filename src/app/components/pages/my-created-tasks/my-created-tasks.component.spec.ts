import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCreatedTasksComponent } from './my-created-tasks.component';

describe('MyCreatedTasksComponent', () => {
  let component: MyCreatedTasksComponent;
  let fixture: ComponentFixture<MyCreatedTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCreatedTasksComponent]
    });
    fixture = TestBed.createComponent(MyCreatedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

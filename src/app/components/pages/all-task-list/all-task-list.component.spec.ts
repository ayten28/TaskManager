import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTaskListComponent } from './all-task-list.component';

describe('AllTaskListComponent', () => {
  let component: AllTaskListComponent;
  let fixture: ComponentFixture<AllTaskListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllTaskListComponent]
    });
    fixture = TestBed.createComponent(AllTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

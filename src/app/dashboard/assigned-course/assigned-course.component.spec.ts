import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedCourseComponent } from './assigned-course.component';

describe('AssignedCourseComponent', () => {
  let component: AssignedCourseComponent;
  let fixture: ComponentFixture<AssignedCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

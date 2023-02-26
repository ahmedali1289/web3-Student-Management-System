import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddteacherComponent } from './addteacher.component';

describe('AddteacherComponent', () => {
  let component: AddteacherComponent;
  let fixture: ComponentFixture<AddteacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddteacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddteacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

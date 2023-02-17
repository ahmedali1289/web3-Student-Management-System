import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageWrapperComponent } from './image-wrapper.component';

describe('ImageWrapperComponent', () => {
  let component: ImageWrapperComponent;
  let fixture: ComponentFixture<ImageWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

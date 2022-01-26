import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRoutineComponent } from './show-routine.component';

describe('ShowRoutineComponent', () => {
  let component: ShowRoutineComponent;
  let fixture: ComponentFixture<ShowRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowRoutineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

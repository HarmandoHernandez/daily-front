import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalRoutineComponent } from './local-routine.component';

describe('LocalRoutineComponent', () => {
  let component: LocalRoutineComponent;
  let fixture: ComponentFixture<LocalRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalRoutineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

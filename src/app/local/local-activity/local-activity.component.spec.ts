import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalActivityComponent } from './local-activity.component';

describe('LocalActivityComponent', () => {
  let component: LocalActivityComponent;
  let fixture: ComponentFixture<LocalActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

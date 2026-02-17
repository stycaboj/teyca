import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeycaCheckbox } from './checkbox';

describe('TeycaCheckbox', () => {
  let component: TeycaCheckbox;
  let fixture: ComponentFixture<TeycaCheckbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeycaCheckbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeycaCheckbox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeycaSelect } from './select';

describe('TeycaSelect', () => {
  let component: TeycaSelect;
  let fixture: ComponentFixture<TeycaSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeycaSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeycaSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

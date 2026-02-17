import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushDialog } from './push-dialog';

describe('PushDialog', () => {
  let component: PushDialog;
  let fixture: ComponentFixture<PushDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PushDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PushDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

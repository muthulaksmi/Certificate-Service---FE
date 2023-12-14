import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FortgotComponent } from './fortgot.component';

describe('FortgotComponent', () => {
  let component: FortgotComponent;
  let fixture: ComponentFixture<FortgotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FortgotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FortgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncesComponent } from './annonces.component';

describe('AnnoncesComponent', () => {
  let component: AnnoncesComponent;
  let fixture: ComponentFixture<AnnoncesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnoncesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnoncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

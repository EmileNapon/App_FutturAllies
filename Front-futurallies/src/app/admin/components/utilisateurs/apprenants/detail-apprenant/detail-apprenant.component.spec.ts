import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEtudiantsComponent } from './detail-etudiants.component';

describe('DetailEtudiantsComponent', () => {
  let component: DetailEtudiantsComponent;
  let fixture: ComponentFixture<DetailEtudiantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailEtudiantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailEtudiantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailEncadrantComponent } from './detail-encadrant.component';


describe('DetailEtudiantsComponent', () => {
  let component: DetailEncadrantComponent;
  let fixture: ComponentFixture<DetailEncadrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailEncadrantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailEncadrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

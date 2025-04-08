import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListEncadrantComponent } from './list-encadrants.component';


describe('ListEtudiantsComponent', () => {
  let component: ListEncadrantComponent;
  let fixture: ComponentFixture<ListEncadrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEncadrantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEncadrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

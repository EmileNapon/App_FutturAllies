import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEtudiantsComponent } from './list-apprenants.component';

describe('ListEtudiantsComponent', () => {
  let component: ListEtudiantsComponent;
  let fixture: ComponentFixture<ListEtudiantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEtudiantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEtudiantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

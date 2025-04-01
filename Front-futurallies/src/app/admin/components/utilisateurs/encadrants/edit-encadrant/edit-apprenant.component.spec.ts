import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEncadrantComponent } from './edit-encadrant.component';

describe('EditEtudiantsComponent', () => {
  let component: EditEncadrantComponent;
  let fixture: ComponentFixture<EditEncadrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEncadrantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEncadrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

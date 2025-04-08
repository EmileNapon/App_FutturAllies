import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEncadrantComponent } from './create-encadrant.component';

describe('EditEtudiantsComponent', () => {
  let component: CreateEncadrantComponent;
  let fixture: ComponentFixture<CreateEncadrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEncadrantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEncadrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

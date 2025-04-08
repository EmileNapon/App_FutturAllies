import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEntreprisetComponent } from './create-entreprise.component';

describe('EditEtudiantsComponent', () => {
  let component: CreateEntreprisetComponent;
  let fixture: ComponentFixture<CreateEntreprisetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEntreprisetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEntreprisetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateurFormationsComponent } from './formateur-formations.component';

describe('FormateurFormationsComponent', () => {
  let component: FormateurFormationsComponent;
  let fixture: ComponentFixture<FormateurFormationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormateurFormationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormateurFormationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

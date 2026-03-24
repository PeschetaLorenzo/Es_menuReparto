import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cucina } from './cucina';

describe('Cucina', () => {
  let component: Cucina;
  let fixture: ComponentFixture<Cucina>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cucina]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cucina);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

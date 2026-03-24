import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cassa } from './cassa';

describe('Cassa', () => {
  let component: Cassa;
  let fixture: ComponentFixture<Cassa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cassa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cassa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

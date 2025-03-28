import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GloboTextoComponent } from './globo-texto.component';

describe('GloboTextoComponent', () => {
  let component: GloboTextoComponent;
  let fixture: ComponentFixture<GloboTextoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GloboTextoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GloboTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonNewDetailComponent } from './pokemon-new-detail.component';

describe('PokemonNewDetailComponent', () => {
  let component: PokemonNewDetailComponent;
  let fixture: ComponentFixture<PokemonNewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonNewDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonNewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

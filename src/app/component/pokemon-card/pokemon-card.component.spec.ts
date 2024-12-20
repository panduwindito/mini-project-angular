import {async} from "rxjs";
import {TestBed} from "@angular/core/testing";
import {PokemonCardComponent} from "./pokemon-card.component";

describe('PokemonCardComponent', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [PokemonCardComponent]
    }).compileComponents();
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(PokemonCardComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  })

  it('should have image', ()=>{
    const fixture = TestBed.createComponent(PokemonCardComponent);
    const pokemon = fixture.componentInstance;
    const expectedPokemon = {img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png", name: "bulbasaur"}
    pokemon.pokemon = expectedPokemon;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const imgTag = compiled.querySelector('img')
    expect(imgTag).not.toBeNull();
    expect(imgTag!!.src).toMatch(expectedPokemon.img)
  })

  it('should have name', ()=>{
    const fixture = TestBed.createComponent(PokemonCardComponent);
    const pokemon = fixture.componentInstance;
    const expectedPokemon = {img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png", name: "bulbasaur"}
    pokemon.pokemon = expectedPokemon;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const h5 = compiled.querySelector('h5')
    expect(h5).not.toBeNull();
    expect(h5!!.innerText).toMatch(expectedPokemon.name)
  })
})

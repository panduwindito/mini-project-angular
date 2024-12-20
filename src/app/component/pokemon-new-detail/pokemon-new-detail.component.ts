import {Component, OnInit} from '@angular/core';
import {PokemonService} from "../../service/pokemon.service";
import { ActivatedRoute } from '@angular/router';
import {Store} from "@ngrx/store";
import { addToCart } from '../../state/cart/cart.actions';

@Component({
  selector: 'app-pokemon-new-detail',
  templateUrl: './pokemon-new-detail.component.html',
  styleUrl: './pokemon-new-detail.component.css',
  standalone: false
})
export class PokemonNewDetailComponent implements OnInit{
  name: string | null = '';
  img: string | null = '';
  pokemon: any[] = []
  abilities: any[] = []
  soundUrl: string = ''
  evolve: any[] = []
  species: any[] = []
  currentEvolve: number = 1
  openModal: boolean = false;
  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  async ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
    await this.fetchPokemonDetail()
  }

  async fetchPokemonDetail(){
    const response = await this.pokemonService.getPokemonByName(this.name)
    this.pokemon = response
    this.img = response.sprites.front_default
    this.species.push(response.species)
    this.abilities = response.abilities
    this.soundUrl = response.cries.legacy
    const species = await this.pokemonService.getPokemonDetail(response.species.url)
    this.evolve.push(species.evolution_chain)
    const evolutionUrl = species.evolution_chain.url
    const evolution = await this.pokemonService.getPokemonDetail(evolutionUrl)
    let temp = evolution.chain.evolves_to[0]
    try{
      while(temp.species.name !=null){
          this.species.push(temp.species)
          temp = temp.evolves_to[0]
      }
    }catch (_){}
  }

  async doEvolve() {
    if (this.currentEvolve < this.species.length && this.currentEvolve > 0) {
      this.currentEvolve++
      const response = await this.pokemonService.getPokemonByName(this.species[this.currentEvolve - 1].name)
      this.name = response.name
      this.img = response.sprites.front_default
      this.soundUrl = response.cries.legacy
      this.abilities = response.abilities
    }
  }

  async doDevolve() {
    if (this.currentEvolve <= this.species.length && this.currentEvolve != 1 ) {
      this.currentEvolve--
      const response = await this.pokemonService.getPokemonByName(this.species[this.currentEvolve - 1].name)
      this.name = response.name
      this.img = response.sprites.front_default
      this.abilities = response.abilities
      this.soundUrl = response.cries.legacy
    }
  }

  playAudio(){
    let audio = new Audio();
    audio.src = this.soundUrl;
    audio.load();
    audio.play();
  }

  openForm(){
    this.openModal = !this.openModal
  }

  addToCart(pokemon: any): void {
    const cartItem = { pokemon, quantity: 1 };
    alert(`Pokemon ${cartItem.pokemon.name} has been added to your cart!`);
    this.store.dispatch(addToCart(cartItem));
  }
}

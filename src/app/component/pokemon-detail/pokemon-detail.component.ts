import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css',
  standalone: false
})
export class PokemonDetailComponent implements OnInit{
  @Input() pokemon: any = null;
  url: string = '';
  @Input() theme: 'light' | 'dark' = 'dark';
  @Output() selectedPokemon = new EventEmitter();
  ngOnInit(): void {
    this.url = `/details/${this.pokemon.name}`
  }
}

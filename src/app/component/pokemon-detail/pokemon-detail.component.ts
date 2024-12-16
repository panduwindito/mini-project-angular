import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css',
  standalone: false
})
export class PokemonDetailComponent{
  @Input() pokemon: any = null;
  @Input() theme: 'light' | 'dark' = 'dark';
}

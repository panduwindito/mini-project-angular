import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
  standalone: false
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: any = null;
  ngOnInit() {
  }
}

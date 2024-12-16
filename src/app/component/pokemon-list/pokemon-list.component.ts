import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from "../../service/user.service";
import {PokemonService} from "../../service/pokemon.service";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
  standalone: false
})
export class PokemonListComponent implements OnInit, OnChanges, OnDestroy {
  pokemonList: any[] = []
  filteredPokemon: any[] = []
  paginatedPokemon: any[] = []
  selectedPokemon: any[] = []
  theme: 'light' | 'dark' = 'dark';
  filter: string = ''
  selectedElement: string = ''
  element: string[] = ['fire', 'water', 'grass', 'electric', 'ice', 'rock']
  itemsPerPage = 10;
  totalPages: number = 0;
  currentPage: number = 1;
  totalData: number = 0;
  currentStart: number = 0;
  currentLast: number = 0;

  constructor(private pokemonService: PokemonService) {
    console.log('pokemonListComponent constructor');
  }

  async ngOnInit() {
    await this.fetchPokemon()
  }
  async ngOnDestroy(){
    console.log('DESTROY')
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("CHANGES")
  }

  async fetchPokemon(){
    const response = await this.pokemonService.getPokemonList(50);
    this.pokemonList = await Promise.all(
      response.map( async (pokemon: any) => {
        const detail = await this.pokemonService.getPokemonDetail(pokemon.url);
        return{
          name: pokemon.name,
          url: pokemon.url,
          image: detail.sprites.front_default,
          element: detail.types[0]?.type.name
        }
      })
    );
    this.filteredPokemon = this.pokemonList
    this.totalData = this.filteredPokemon.length
    this.updatePagination()
  }

  applyFilter(){
    this.filteredPokemon = this.pokemonList.filter((pokemon) => {
        const matchesName = pokemon.name.toLowerCase()
          .includes(this.filter.toLowerCase())
        const matchesElement =
          !this.selectedElement || pokemon.element === this.selectedElement
        return matchesName && matchesElement;
      }
    );
  }

  paginate(){
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPokemon = this.filteredPokemon.slice(startIndex, endIndex);
    this.currentStart = startIndex + 1
    this.currentLast = Math.min(endIndex, this.paginatedPokemon.length)
  }
  updatePagination(){
    this.totalPages = Math.ceil(this.filteredPokemon.length/this.itemsPerPage);
    this.paginate()
  }

  nextPage(){
    if(this.currentPage < this.totalPages){
      this.currentPage++;
      this.paginate()
    }
  }
  previousPage(){
    if(this.currentPage > 1){
      this.currentPage--
      this.paginate()
    }
  }

  async selectPokemon(url: string){
    this.selectedPokemon = await this.pokemonService.getPokemonDetail(url)
  }

  toggleTheme(){
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  }

  getValue(event: Event){
    this.filter = (event.target as HTMLInputElement).value;
    this.applyFilter()
    this.totalData = this.filteredPokemon.length
    this.updatePagination()
    this.currentPage = 1
  }
}

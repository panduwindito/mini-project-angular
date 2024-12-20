import {Component, Input, OnInit} from '@angular/core';
import {RealtimeDatabaseService} from "../../service/realtime-database.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {PokemonService} from "../../service/pokemon.service";
import {CartItem} from "../../state/cart/cart.state";
import {Observable} from "rxjs";
import {selectCartItems} from "../../state/cart/cart.selector";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {clearCart} from "../../state/cart/cart.actions";

@Component({
  selector: 'app-checkout',
  standalone: false,

  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  cartItems$: Observable<CartItem[]>;
  cartItems: CartItem[] = [];
  @Input() listPokemon: any[] = []
  @Input() index: number = 0
  listData: any[] = []
  selectedPokemon: any[] = []
  selectedPokemonName: any[] = []
  showAllArr: boolean[] = []
  quantity: any[] = []

  constructor(
    private realtimeDb: RealtimeDatabaseService,
    private formBuilder: FormBuilder,
    private pokemonService: PokemonService,
    private store: Store,
    private route: Router
  ) {
    this.cartItems$ = this.store.select(selectCartItems);
  }
  async ngOnInit() {
    this.cartItems$.subscribe(async (items) => {
      if (!items || items.length === 0) {
        this.cartItems = [];
        return;
      }
      this.cartItems = items;
    });
    this.cartItems.forEach((item) => {
      const number = [...Array(item.quantity).keys()]
      this.quantity.push(number);
    })
    await this.fetchAllPokemon()
  }
  async fetchAllPokemon(){
    await Promise.all(
      this.cartItems.map(async (pokemon:any) => {
        const response = await this.pokemonService.getPokemonDetail(pokemon.pokemon.species.url);
        const evo = await this.pokemonService.getPokemonDetail(response.evolution_chain.url);
        let temp = []
        let evolve = evo.chain
        try{
          while(evolve){
            temp.push(evolve.species.name)
            evolve = evolve.evolves_to[0]
          }
        }catch (_){
        }
        this.listPokemon.push(temp)
      })
    )
    this.listData = await Promise.all(
      this.listPokemon.map(async (names:[]) => {
        return await Promise.all(
          names.map(async (name: any) => {
            const response = await this.pokemonService.getPokemonByName(name)
            return {
              name: response.name,
              img: response.sprites.front_default
            }
          })
        )
      })
    )
    for (const pokemons of this.listData) {
      this.showAllArr.push(true)
      // console.log(pokemons)
      const temp = await Promise.all(
          pokemons.map(async (pokemon:any) => {
            return pokemon.name
          }
        )
      )
      this.selectedPokemonName.push(temp)
    }
    this.selectedPokemon = this.selectedPokemonName
  }
  checkoutForm = this.formBuilder.group({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    listPokemon: new FormControl('', [Validators.required]),
    pokemonToBuy: new FormControl<any[]>([]),
  });

  async onSubmit(){
    this.checkoutForm.controls["pokemonToBuy"].setValue(this.selectedPokemon)
    await this.realtimeDb.saveFormSubmission(this.checkoutForm.value)
    this.store.dispatch(clearCart());
    this.route.navigate(['/submission'])
  }

  changeShow(event: Event, index: number){
    this.showAllArr[index] = (event.target as HTMLInputElement).value === "false" ;
    if(this.showAllArr[index]){
      this.selectedPokemon[index] = this.selectedPokemonName[index]
    }else{
      this.selectedPokemon[index] = this.cartItems[index].pokemon.name
    }
  }
}

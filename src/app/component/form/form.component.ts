import {Component, Input, OnInit} from '@angular/core';
import {RealtimeDatabaseService} from "../../service/realtime-database.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {PokemonService} from "../../service/pokemon.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  @Input() listPokemon: any[] = []
  @Input() index: number = 0
  listData: any[] = []
  selectedPokemon: string[] = []
  showAll: Boolean = true;

  constructor(
    private realtimeDb: RealtimeDatabaseService,
    private formBuilder: FormBuilder,
    private pokemonService: PokemonService
  ) {
  }
  async ngOnInit() {
    await this.fetchAllPokemon()
  }
  async fetchAllPokemon(){
    this.listData = await Promise.all(
      this.listPokemon.map(async (pokemon:any) => {
        const response = await this.pokemonService.getPokemonByName(pokemon.name)
        return {
          name: pokemon.name,
          img: response.sprites.front_default
        }
      })
    )
    this.selectedPokemon = this.listData.map(({name}) => name)
  }
  checkoutForm = this.formBuilder.group({
    amount: new FormControl('', [Validators.min(0)]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    listPokemon: new FormControl('', [Validators.required]),
    pokemonToBuy: new FormControl<string[]>([]),
  });

  async onSubmit(){
    this.checkoutForm.controls["pokemonToBuy"].setValue(this.selectedPokemon)
    await this.realtimeDb.saveFormSubmission(this.checkoutForm.value)
  }

  changeShow(event: Event){
    this.showAll = (event.target as HTMLInputElement).value === "false" ;
    if(this.showAll){
      this.selectedPokemon = this.listData.map(({name}) => name)
    }else{
      this.selectedPokemon = [this.listData[this.index].name]
    }
  }

}

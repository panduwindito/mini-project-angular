import {Component, Input, OnInit} from '@angular/core';
import {RealtimeDatabaseService} from "../../service/realtime-database.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {PokemonService} from "../../service/pokemon.service";
import {CandeactiveguardGuard} from "../../guard/candeactiveguard.guard";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-pokemon',
  standalone: false,

  templateUrl: './edit-pokemon.component.html',
  styleUrl: './edit-pokemon.component.css'
})
export class EditPokemonComponent implements OnInit, CandeactiveguardGuard{
  isUpdate: boolean = false
  canDeactivate(): boolean{
    if(this.checkoutForm.dirty && !this.isUpdate){
      return confirm("Yakin Ingin pindah page")
    }
    this.isUpdate = false
    return true
  };
  @Input() id: string=  ''
  listData: any[] = []
  selectedPokemon: string[] = []
  showAll: Boolean = true;

  constructor(
    private realtimeDb: RealtimeDatabaseService,
    private formBuilder: FormBuilder,
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }
  async ngOnInit() {
    await this.fetchAllPokemon()
  }
  async fetchAllPokemon(){
    this.id = this.route.snapshot.paramMap.get('id')!!
    const response = await this.realtimeDb.getFormSubmission(this.id)
    console.log(response)
    this.checkoutForm.patchValue(response)
  }
  checkoutForm = this.formBuilder.group({
    amount: new FormControl('', [Validators.min(0)]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    listPokemon: new FormControl('', [Validators.required])
  });

  async onSubmit(){
    this.isUpdate = true
    await this.realtimeDb.updateFormSubmission(this.id, this.checkoutForm.value)
    this.router.navigate(['/submission'])
  }
}

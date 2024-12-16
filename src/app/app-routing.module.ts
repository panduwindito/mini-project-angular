import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserPageComponent} from "./feature/user2/user-page/user-page.component";
import {PokemonListComponent} from "./component/pokemon-list/pokemon-list.component";

const routes: Routes = [
  {path: '', component: PokemonListComponent},
  {path: '**', component: PokemonListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

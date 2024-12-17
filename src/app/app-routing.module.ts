import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserPageComponent} from "./feature/user2/user-page/user-page.component";
import {PokemonListComponent} from "./component/pokemon-list/pokemon-list.component";
import {PokemonNewDetailComponent} from "./component/pokemon-new-detail/pokemon-new-detail.component";

const routes: Routes = [
  {path: '', component: PokemonListComponent},
  {path: 'details/:name', component: PokemonNewDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

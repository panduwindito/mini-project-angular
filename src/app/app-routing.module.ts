import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserPageComponent} from "./feature/user2/user-page/user-page.component";
import {PokemonListComponent} from "./component/pokemon-list/pokemon-list.component";
import {PokemonNewDetailComponent} from "./component/pokemon-new-detail/pokemon-new-detail.component";
import {ListSubmissionComponent} from "./component/list-submission/list-submission.component";
import {LoginFormComponent} from "./component/login-form/login-form.component";
import {AuthGuard} from "./guard/auth.guard";
import {CandeactiveguardGuard} from "./guard/candeactiveguard.guard";
import {LogoutComponent} from "./component/logout/logout.component";
import {EditPokemonComponent} from "./component/edit-pokemon/edit-pokemon.component";

const routes: Routes = [
  {path: '', component: PokemonListComponent},
  {path: 'details/:name', component: PokemonNewDetailComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'submission', component: ListSubmissionComponent, canActivate: [AuthGuard]},
  {path: 'edit/:id', component: EditPokemonComponent, canActivate: [AuthGuard], canDeactivate:[CandeactiveguardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

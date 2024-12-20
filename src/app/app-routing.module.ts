import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PokemonListComponent} from "./component/pokemon-list/pokemon-list.component";
import {PokemonNewDetailComponent} from "./component/pokemon-new-detail/pokemon-new-detail.component";
import {ListSubmissionComponent} from "./component/list-submission/list-submission.component";
import {LoginFormComponent} from "./component/login-form/login-form.component";
import {AuthGuard} from "./guard/auth.guard";
import {CandeactiveguardGuard} from "./guard/candeactiveguard.guard";
import {LogoutComponent} from "./component/logout/logout.component";
import {EditPokemonComponent} from "./component/edit-pokemon/edit-pokemon.component";
import {CartComponent} from "./component/cart/cart.component";
import {CheckoutComponent} from "./component/checkout/checkout.component";

const routes: Routes = [
  {path: '', component: PokemonListComponent},
  {path: 'details/:name', component: PokemonNewDetailComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'submission', component: ListSubmissionComponent, canActivate: [AuthGuard]},
  {path: 'edit/:id', component: EditPokemonComponent, canActivate: [AuthGuard], canDeactivate:[CandeactiveguardGuard]},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

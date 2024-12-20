import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListSubmissionComponent} from "./component/list-submission/list-submission.component";
import {AuthGuard} from "./guard/auth.guard";
import {CandeactiveguardGuard} from "./guard/candeactiveguard.guard";
import {LogoutComponent} from "./component/logout/logout.component";
import {EditPokemonComponent} from "./component/edit-pokemon/edit-pokemon.component";
import {CartComponent} from "./component/cart/cart.component";
import {CheckoutComponent} from "./component/checkout/checkout.component";
import {LayoutComponent} from "./layout/layout.component";
import {PokemonNewDetailComponent} from "./component/pokemon-new-detail/pokemon-new-detail.component";
import {PokemonListComponent} from "./component/pokemon-list/pokemon-list.component";

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./feature/pokemon/login.module').then(
        m => m.LoginModule
      ),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: PokemonListComponent},
      {path: 'details/:name', component: PokemonNewDetailComponent},
      {path: 'logout', component: LogoutComponent},
      {path: 'submission', component: ListSubmissionComponent, canActivate: [AuthGuard]},
      {path: 'details/:name', component: PokemonNewDetailComponent, canActivate: [AuthGuard]},
      {path: 'edit/:id', component: EditPokemonComponent, canActivate: [AuthGuard], canDeactivate:[CandeactiveguardGuard]},
      {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
      {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

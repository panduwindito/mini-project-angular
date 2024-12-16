import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from "./feature/product/product.module";
import { UserComponent } from './feature/user/user.component';
import { PokemonListComponent } from './component/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './component/pokemon-detail/pokemon-detail.component';
import { PaginationComponent } from './component/pagination/pagination.component';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from "./feature/product/product.module";
import { UserComponent } from './feature/user/user.component';
import { PokemonListComponent } from './component/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './component/pokemon-detail/pokemon-detail.component';
import { PaginationComponent } from './component/pagination/pagination.component';
import { PokemonNewDetailComponent } from './component/pokemon-new-detail/pokemon-new-detail.component';
import {provideHttpClient} from "@angular/common/http";
import { FormComponent } from './component/form/form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatFormField} from "@angular/material/form-field";
import { PokemonCardComponent } from './component/pokemon-card/pokemon-card.component';
import { ListSubmissionComponent } from './component/list-submission/list-submission.component';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    PaginationComponent,
    PokemonNewDetailComponent,
    FormComponent,
    PokemonCardComponent,
    ListSubmissionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductModule,
    ReactiveFormsModule,
    MatFormField,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient(), provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './feature/user/user.component';
import { PokemonListComponent } from './component/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './component/pokemon-detail/pokemon-detail.component';
import { PaginationComponent } from './component/pagination/pagination.component';
import { PokemonNewDetailComponent } from './component/pokemon-new-detail/pokemon-new-detail.component';
import {provideHttpClient} from "@angular/common/http";
import { FormComponent } from './component/form/form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PokemonCardComponent } from './component/pokemon-card/pokemon-card.component';
import { ListSubmissionComponent } from './component/list-submission/list-submission.component';
import {environment} from "../environment/environment";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getAuth, provideAuth} from "@angular/fire/auth";
import { LoginFormComponent } from './component/login-form/login-form.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LogoutComponent } from './component/logout/logout.component';
import { EditPokemonComponent } from './component/edit-pokemon/edit-pokemon.component';
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
    LoginFormComponent,
    NavbarComponent,
    LogoutComponent,
    EditPokemonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient(),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),],
  bootstrap: [AppComponent]
})
export class AppModule { }

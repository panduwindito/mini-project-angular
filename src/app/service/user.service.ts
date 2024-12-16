import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getData(){
    return {
      name: 'Pandu',
      age: 22
    }
  }
  constructor() { }
}

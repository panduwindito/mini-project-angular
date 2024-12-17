import { Injectable } from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species';
  private evolveUrl = 'https://pokeapi.co/api/v2/evolution-chain';

  constructor() {
    console.log('PokemonService Initiate');
  }
  async getPokemonList(limit: number = 20) {
    const response = await axios.get(`${this.apiUrl}?limit=${limit}`)
    return response.data.results;
  }

  async getPokemonDetail(url: string){
    const response = await axios.get(url);
    return response.data;
  }
  async getPokemonByName(id: string | null){
    const response = await axios.get(`${this.apiUrl}/${id}`)
    return response.data
  }
  async getPokemonById(id: string | null){
    console.log(`${this.apiUrl}/${id}`)
    const response = await axios.get(`${this.apiUrl}/${id}`)
    return response.data
  }
  async getEvolve(id: string | null){
    const url = await this.getSpecies(id)
    const response = await axios.get(url)
    const data = response.data
    while(data.evolves_to != null){

    }
    return response.data
  }
  async getSpecies(id: string | null){
    const response = await axios.get(`${this.speciesUrl}/${id}`)
    return response.data.evolution_chain.url
  }
}

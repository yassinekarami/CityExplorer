import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Service for CRUD opperation on favoriteRestaurant
 */
@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  
  /**
   * Api url to hit
   */
  private apiUrl = '/api/favorite'; 

  /**
   * Constructor for the service
   * @param http HttpClient for the request
   */
  constructor(private http: HttpClient) {}

  /**
   * add the restaurant to the favorite list
   * @param nomoffre the nae of the restaurant
   * @returns 
   */
  addFavorite(nomoffre: string): any {
    let body = {
      nomoffre: nomoffre
    }
    return this.http.post(this.apiUrl, body)
  }

  getAllFavorite(userId: string): any {
    return this.http.get(`this.apiUrl/${userId}`)
  }

  /**
   * remove the restaurant from the user's favorite restaurant
   * @param nomoffre the name of the restaurant
   * @returns  
   */
  removeFavorite(nomoffre: string): any {
    
    const params = new HttpParams().set('nomoffre', nomoffre);

    return this.http.delete(this.apiUrl, {params})
  }
}

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
  addFavorite(userId: string | null, nomoffre: string): any {

    if (!userId) {
      throw new Error('User ID cannot be null');
    }

    let body = {
      _id: userId,
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
  removeFavorite(userId: string | null, nomoffre: string): any {
    
    if (!userId) {
      throw new Error('User ID cannot be null');
    }

    const params = new HttpParams()
                .set("_id", userId)
                .set('nomoffre', nomoffre);

    return this.http.delete(this.apiUrl, {params})
  }
}

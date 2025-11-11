import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

/**
 * Service for retreiving / filtring the restaurants 
 */
@Injectable({
  providedIn: 'root',
})
export class RestaurantService {

  private apiUrl = '/api/restaurants'; 

  constructor(private http: HttpClient) {}

  /**
   * get all the restaurants
   * @param limit the limit in the api call
   * @param offset the offset in the api call
   * @returns return a list of restaurant a limit number of restaurant from the offset 
   */
  getRestaurants(limit: string, offset: string): Observable<any> {
    
    const headers = new HttpHeaders()
                    .set('limit', limit)
                    .set("offset", offset);
    
    return this.http.get(this.apiUrl, {headers});
  }
 

  /**
   * filter restaurant list by criteria
   * @param criteria criteria to filter with
   * @returns filtred list of restaurant
   */
  filterRestaurant(criteria: Object): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/filter`, criteria);
  }
  
}

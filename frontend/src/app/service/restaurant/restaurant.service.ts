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

  // GET request
  getRestaurants(limit: string, offset: string): Observable<any> {
    
    const headers = new HttpHeaders()
                    .set('limit', limit)
                    .set("offset", offset);
    
    return this.http.get(this.apiUrl, {headers});
  }
 
  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

    private apiUrl = '/api/user'; 

    constructor(private http: HttpClient) {}
  
    signUp(): Observable<any> {
      return this.http.get<any>(this.apiUrl);
    }

    signIn(email: String, password: String): Observable<any> {
      let body = {
        email: email,
        password: password
      }
      return this.http.post<any>(this.apiUrl, body);
    }
}

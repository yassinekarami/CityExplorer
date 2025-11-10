import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


// Define the expected response from Fastify
export interface RegisterResponse {
  message: string;
  userId: string;
}

/**
 * Service for signIn and signUp
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {

    private apiUrl = '/api/auth'; 

    constructor(private http: HttpClient) {}
  
    login(email: string, password: string): any{
      let body = {
      nomoffre: "nomoffre"
    }
      return this.http.post(`${this.apiUrl}/login`, {email, password});
    }

    register(email: string, password: string):any {
   
    return this.http.post(`${this.apiUrl}`, {email, password});
  }
}

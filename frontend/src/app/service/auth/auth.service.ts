import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


interface AuthResponse {
  token: string;
  user: User;
  // add other properties if needed
}

interface User {
  _id: string;
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
  
    // problème asynchronisme ici 
    // entre le service et l'interceptor
    login(email: string, password: string): void{

       this.http.post<AuthResponse>(`${this.apiUrl}/login`, {email, password}).subscribe(
        res => {
          console.log(res)
           localStorage.setItem('token', res.token)
           localStorage.setItem('userId', res.user._id)
        }
      );
    }

    token() {
     return localStorage.getItem('token')
    }
    
    isUserLogged() {
      return localStorage.getItem("isUserLogged")
    }

    register(email: string, password: string):any {
   
    return this.http.post(`${this.apiUrl}/register`, {email, password});
  }
}

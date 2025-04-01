import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface-inscription/interface-inscription';
import { environment } from '../../../../../src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

 
    registerUser(formData: FormData): Observable<any> {
      // Laisse Angular s'occuper du Content-Type pour FormData
      return this.http.post<any>(`${this.apiUrl}/register/`, formData);
    }
  

  add(domaine: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/domaines/create/`, domaine, { headers });
  }
}

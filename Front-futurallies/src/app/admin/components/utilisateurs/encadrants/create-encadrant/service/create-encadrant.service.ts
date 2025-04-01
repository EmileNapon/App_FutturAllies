import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomUser } from '../../../../../models/tousModel';

import { environment } from '../../../../../../../../src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
  })
  export class CreateEncadrantService {
  
  
      constructor(private http:HttpClient){}
      private apiUrl = environment.apiUrl;
  
  // Création d'un utilisateur (par exemple un formateur)
  createUser(newUser: any): Observable<any> {
    return this.http.post<CustomUser>(`${this.apiUrl}/register/`, newUser);
  }
  
  }
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomUser } from '../../../../../models/tousModel';
import { environment } from '../../../../../../../../src/environments/environment.prod';



@Injectable({
    providedIn: 'root'
  })
  export class DetailApprenantsService {
  
  
      constructor(private http:HttpClient){}
  
      private apiUrl = environment.apiUrl;  // URL dynamique
      //private apiUrl = 'http://127.0.0.1:8000/fidalli/apprenants/';
  
      getApprenantById(id: number): Observable<CustomUser> {
        return this.http.get<CustomUser>(`${this.apiUrl}/apprenants/${id}/`);
      }
  
  }
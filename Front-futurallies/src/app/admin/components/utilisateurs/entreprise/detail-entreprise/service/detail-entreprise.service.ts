import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomUser } from '../../../../../models/tousModel';

import { environment } from '../../../../../../../../src/environments/environment.prod';


@Injectable({
    providedIn: 'root'
  })
  export class DetailEntrepriseService {
  
  
      constructor(private http:HttpClient){}
      private apiUrl = environment.apiUrl;

  
      getEntrepriseByIds(id: number): Observable<CustomUser> {
        return this.http.get<CustomUser>(`${this.apiUrl}/entreprises/${id}/`);
      }
  
  }
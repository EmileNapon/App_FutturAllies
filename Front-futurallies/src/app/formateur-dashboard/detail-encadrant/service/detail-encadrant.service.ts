import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CustomUser } from '../../models/tousModel';



@Injectable({
    providedIn: 'root'
  })
  export class DetailEncadrantService {
  
  
      constructor(private http:HttpClient){}
      private apiUrl = environment.apiUrl;
  
      getEncadrantByIds(id: number): Observable<CustomUser> {
        return this.http.get<CustomUser>(`${this.apiUrl}/encadrants/${id}/`);
      }
  
  }
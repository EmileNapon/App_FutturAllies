import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomUser } from '../../../../../models/tousModel';
import { environment } from '../../../../../../../../src/environments/environment.prod';


@Injectable({
    providedIn: 'root'
  })
  export class EditEncadrantService {
  
  
      constructor(private http:HttpClient){}
      private apiUrl = environment.apiUrl;

      getEncadrantById(id: number): Observable<CustomUser> {
        return this.http.get<CustomUser>(`${this.apiUrl}/encadrants/${id}/`);
      }
  
      updateEncadrant(id: number, updatedUser: any): Observable<any> {
        return this.http.put<CustomUser>(`${this.apiUrl}/users/${id}/`, updatedUser);
      }



  
  }
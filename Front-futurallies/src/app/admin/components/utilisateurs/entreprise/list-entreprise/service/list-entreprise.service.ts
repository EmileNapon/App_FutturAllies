import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomUser } from '../../../../../models/tousModel';
import { environment } from '../../../../../../../../src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ListEntrepriseService {

    constructor(private http:HttpClient){}

    private apiUrl = environment.apiUrl;

    getEntreprises(): Observable<CustomUser[]> {
        return this.http.get<CustomUser[]>(`${this.apiUrl}/entreprises/`);   
      }

      deleteEntreprise(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/users/delete/${id}/`);
      }
      

}
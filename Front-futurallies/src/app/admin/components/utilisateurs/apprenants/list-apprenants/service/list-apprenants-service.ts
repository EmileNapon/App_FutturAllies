import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomUser } from '../../../../../models/tousModel';
import { environment } from '../../../../../../../../src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ListApprenantsService {


    constructor(private http:HttpClient){}
    private apiUrl = environment.apiUrl;

    getApprenants(): Observable<CustomUser[]> {
        return this.http.get<CustomUser[]>(`${this.apiUrl}/apprenants/`);   
      }

      deleteApprenant(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/users/delete/${id}/`);
      }

      getApprenantsPaginated(page: number, size: number): Observable<CustomUser[]> {
        const url = `${this.apiUrl}?page=${page}&size=${size}`;
        return this.http.get<CustomUser[]>(url)
      }
      
      



      
}
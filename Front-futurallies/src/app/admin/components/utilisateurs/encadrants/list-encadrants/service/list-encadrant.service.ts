import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomUser } from '../../../../../models/tousModel';
import { environment } from '../../../../../../../../src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ListEncadrantService {


    constructor(private http:HttpClient){}
    private apiUrl = environment.apiUrl;

    getEncadrants(params: any = {}): Observable<CustomUser[]> {
        return this.http.get<CustomUser[]>(`${this.apiUrl}/encadrants/`,{params});   
      }

      deleteEncadrant(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/users/delete/${id}/`);
      }
      
      getEncadrantsPaginated(page: number, size: number): Observable<CustomUser[]> {
        const url = `${this.apiUrl}?page=${page}&size=${size}`;
        return this.http.get<CustomUser[]>(url)
      }
}
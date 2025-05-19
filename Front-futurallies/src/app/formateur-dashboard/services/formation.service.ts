import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formation } from '../models/tousModel';
import { environment } from 'src/environments/environment.prod';




@Injectable({
  providedIn: 'root'
})
export class FormationService {

 private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) {}
  
  getFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.apiUrl}/formation/list-formations`);
  }

  getFormations1(params:any={}): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.apiUrl}/formation/formations1/`,{params});
  }

  getFormationById(id: number): Observable<Formation> {
    return this.http.get<Formation>(`${this.apiUrl}/formation/list-formations/${id}`);
  }

  addFormation(formation: Formation): Observable<Formation> {
    return this.http.post<Formation>(`${this.apiUrl}/formation/create`, formation);
  }

  updateFormation(id: number, formation: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/formation/${id}/update/`, formation);
  }

  deleteFormation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/formations/${id}/remove/`);
  }





}


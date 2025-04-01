import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class GestionnaireServiceService {

  constructor(private http:HttpClient ) { 

  } 
   private apiUrl = environment.apiUrl;
  // private domainesUrl = 'http://127.0.0.1:8000/fidalli/domaines/list_domaines';
   //private addomainesUrl = 'http://127.0.0.1:8000/fidalli/domaines/create';

   getDomaines(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/domaines/list_domaines`);
  }

  addDomaine(domaine: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/domaines/create/`, domaine);
  }

}

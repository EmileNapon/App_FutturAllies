import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class GestionnaireServiceService {

  constructor(private http:HttpClient ) { 

  } 
   private apiUrl = environment.apiUrl;

   getDomaines(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/domaines/list_domaines`);
  }

  addDomaine(domaine: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/domaines/create/`, domaine);
  }

}

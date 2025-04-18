import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GestionnaireModifierContenuCoursService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }




  getContenu(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/contenus/list_contenus`);
  }



  getSection(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/section/list_sections`);
  
  }
  getChapitre(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/chapitre/list_chapitres`);
  }

  updateContenu(ContenusFiltres:any): Observable<any[]> {
    return this.http.put<any[]>(`${this.apiUrl}/contenu/update-contenu/`,ContenusFiltres,  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }); 
  }




}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class GestionnaireModifierContenuCoursService {
  private apiUrl = environment.apiUrl;
  //private contenuUrl = 'http://127.0.0.1:8000/fidalli/contenus/list_contenus';  // URL de l'API
 // private chapitreUrl = 'http://127.0.0.1:8000/fidalli/chapitre/list_chapitres';  // URL de l'API

  //private AddcontenuUrl = "http://127.0.0.1:8000/fidalli/contenu/update-contenu"
  //private sectionUrl= "http://127.0.0.1:8000/fidalli/section/list_sections";
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

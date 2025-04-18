import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GestionnaireChapitreServiceService {
  private apiUrl = environment.apiUrl;


  constructor( private http: HttpClient ) { }

  
  getChapitre(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/chapitre/list_chapitres`);
  }

  addChapitre(cour: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/chapitre/create/`, cour);
  }

  getSection(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/section/list_sections`);
  
  }





  getcontenu(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/contenus/list_contenus`);
  
}
AddContenu(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/contenus/list_contenus`);

}

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seance } from '../models/tousModel';
import { environment } from '../../../../src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {
  private apiUrl = environment.apiUrl;
  //private apiUrl = 'http://127.0.0.1:8000/fidalli/seance/list_seances'; // Remplacer par votre API
  //private baseUrl = 'http://127.0.0.1:8000/fidalli/seances'
 // private apiUrl3="http://127.0.0.1:8000/fidalli/seance/create/"
  //private apiUrl1= "http://127.0.0.1:8000/fidalli/seances/liste-seance"
  //private apiUrl2= "http://127.0.0.1:8000/fidalli/seance"                
  private lastId: number = 0; // Pour simuler l'incrémentation d'ID

  constructor(private http: HttpClient) {}

  getSeances(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/seance/list_seances`);
  }

  getSeanceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/seances/liste-seance/${id}`);
  }

//   addSeance(seance: Seance): Observable<Seance> {
//     return this.http.post<Seance>(this.apiUrl, seance);
//   }

  addSeance(seance: Seance): Observable<Seance> {
    // Attribuer un ID numérique et incrémental
    // seance.id = ++this.lastId;
    return this.http.post<Seance>(`${this.apiUrl}/seance/create/`, seance);
  }

  updateSeance(seance: Seance): Observable<Seance> {
    return this.http.put<Seance>(`${this.apiUrl}/seance/${seance.id}/update/`, seance);
  }



  deleteSeance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/seances/${id}/delete/`);
  }




  deleteSeances(listeSeance: any): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/seance/list_seances/${listeSeance}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class DasbordEtudiantService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}



  getInscrits(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/inscrit/listes_inscrits/`);
  }

  getFormations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/formation/list-formations/`);
  }

  // Récupérer tous les webinaires
  getWebinars(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/webinars`);
  }


    // Récupérer tous les webinaires
    getWebinarInscrit(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/webinars-inscrit`);
    }

}

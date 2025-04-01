import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Webinar } from '../models/webinar.model';
import { WebinarEnrollment } from '../models/webinar-enrollmnet.model';
import { environment } from '../../../../../src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WebinarService {
  private apiUrl = environment.apiUrl;
  //private apiUrl = 'http://127.0.0.1:8000/fidalli/webinars'; // Adresse de l'API pour les webinaires

  constructor(private http: HttpClient) {}

  // Récupérer tous les webinaires
  getWebinars(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/webinars`);
  }

  // Récupérer un webinaire par ID
  getWebinarById(id: string): Observable<Webinar> {
    return this.http.get<Webinar>(`${this.apiUrl}/webinars/${id}`);
  }

  // Créer un nouveau webinaire
  createWebinar(webinar: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/webinars/create/`, webinar);
  }

  // Modifier un webinaire existant
  editWebinar(webinarId: string, webinar: Webinar): Observable<Webinar> {
    return this.http.put<Webinar>(`${this.apiUrl}/webinars/${webinarId}/update`, webinar);
  }

  // Supprimer un webinaire
  deleteWebinar(webinarId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/webinars/${webinarId}/delete`);
  }

  // Inscrire un utilisateur à un webinaire
  enrollToWebinar(enrollData: any): Observable<any> {
    //const apiUrlEnrollments = 'http://127.0.0.1:8000/fidalli/webinarEnrollments/enroll';
    return this.http.post<WebinarEnrollment>(`${this.apiUrl}/webinarEnrollments/enroll`, enrollData);
  }

  
}

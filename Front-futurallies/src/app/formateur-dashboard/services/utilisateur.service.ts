import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomUser, Group } from '../models/tousModel';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private apiUrl = environment.apiUrl;

  
  constructor(private http: HttpClient) { }


  getEncadrants(): Observable<CustomUser[]> {
    return this.http.get<CustomUser[]>(`${this.apiUrl}/encadrants`);   
  }


  // Méthode générique pour récupérer tous les utilisateurs
  getUtilisateurs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/`);
  }

  // Méthode pour filtrer par rôle
  getUtilisateursByRole(role: 'apprenant' | 'employeur' | 'formateur'): Observable<CustomUser[]> {
    return this.getUtilisateurs().pipe(
      map((utilisateurs: CustomUser[]) => utilisateurs.filter(utilisateur => utilisateur.role === role))
    );
  }

  // Méthodes spécifiques utilisant le filtre par rôle
  getEtudiants(): Observable<CustomUser[]> {
    return this.getUtilisateursByRole('apprenant');
  }

  getEmployeurs(): Observable<CustomUser[]> {
    return this.getUtilisateursByRole('employeur');
  }

  getFormateurs(): Observable<CustomUser[]> {
    return this.getUtilisateursByRole('formateur');
  }


  // Création d'un utilisateur (par exemple un formateur)
  createUser(newUser: any): Observable<any> {
    return this.http.post<CustomUser>(`${this.apiUrl}/register/`, newUser);
  }

  //   // Création d'un utilisateur (par exemple un formateur)
  // createEncadrant(newEncadrant: any): Observable<any> {
  //   return this.http.post<CustomUser>(this.addEncadrantUrl, newEncadrant);
  // }
  // Modification d'un utilisateur
  updateEncadrant(id: number, updatedUser: any): Observable<any> {
    const url = `${this.apiUrl}/users/${id}/`;
    return this.http.put<CustomUser>(url, updatedUser);
  }

  // Suppression d'un utilisateur
  deleteUser(id: number): Observable<void> {
    const url = `${this.apiUrl}/users/${id}`;
    return this.http.delete<void>(url);
  }

  // // Méthode pour sauvegarder les groupes
  // saveGroupes(groupes: Group[]): Observable<Group> {
  //   return this.http.post<Group>(this.groupesUrl, groupes);
  // }

  // // Méthode pour récupérer les groupes
  // getGroupes(): Observable<Group[]> {
  //   return this.http.get<Group[]>(this.groupesUrl);
  // }
}

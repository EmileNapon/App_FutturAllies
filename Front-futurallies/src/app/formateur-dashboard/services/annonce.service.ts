import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Annonce } from '../models/tousModel';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  private apiUrl = environment.apiUrl;
  //private jsonUrl = 'http://127.0.0.1:8000/fidalli/annonces';  // Chemin vers le fichier JSON simulé pour l'exemple
  // private annonces: Annonce[] = [];  
  // Liste des annonces chargées en mémoire (pour simulation)

  constructor(private http: HttpClient) {}

  // 1. Récupérer toutes les annonces
  getAnnonces(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiUrl}/annonces`);
    
  }

  // 2. Récupérer une annonce par ID
  getAnnonceById(id: number): Observable<Annonce> {
    // return of(this.annonces.find(annonce => annonce.id === id));
    return this.http.get<Annonce>(`${this.apiUrl}/annonces/${id}`);
  }

  // 3. Ajouter une nouvelle annonce
  // addAnnonce(newAnnonce: Annonce): Observable<Annonce> {
  //   newAnnonce.id = this.annonces.length + 1;
  //   this.annonces.push(newAnnonce);
  //   return of(newAnnonce);
  // }

  addAnnonce(annonce: any): Observable<any> {
    // annonce.id = this.annonces.length + 1;
    return this.http.post<any>(`${this.apiUrl}/annonces`, annonce);
  }

  // 4. Mettre à jour une annonce
  // updateAnnonce(updatedAnnonce: Annonce): Observable<Annonce | undefined> {
  //   const index = this.annonces.findIndex(annonce => annonce.id === updatedAnnonce.id);
  //   if (index !== -1) {
  //     this.annonces[index] = updatedAnnonce;
  //     return of(updatedAnnonce);
  //   }
  //   return of(undefined); 
  // }

  updateAnnonce(annonce: Annonce): Observable<Annonce> {
    return this.http.put<Annonce>(`${this.apiUrl}/annonces/${annonce.id}`, annonce);
  }

  // updateFormation(formation: Formation): Observable<Formation> {
  //   return this.http.put<Formation>(`${this.apiUrl}/${formation.id}`, formation);
  // }

  // 5. Supprimer une annonce
  // deleteAnnonce(id: number): Observable<boolean> {
  //   const index = this.annonces.findIndex(annonce => annonce.id === id);
  //   if (index !== -1) {
  //     this.annonces.splice(index, 1);
  //     return of(true);  
  //     Retourne true si la suppression a réussi
  //   }
  //   return of(false);  
  //   Retourne false si l'annonce n'est pas trouvée
  // }
  deleteAnnonce(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/annonces/${id}/`);
  }
}

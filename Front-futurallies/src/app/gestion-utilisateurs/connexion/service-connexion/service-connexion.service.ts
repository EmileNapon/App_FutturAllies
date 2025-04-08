import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiUrl = 'http://127.0.0.1:8000/fidalli'; // Base URL de votre API
  private apiUrl = environment.apiUrl;
  private userId: string | null = null;
  private userEmail: string | null = null;
  private userFirstName: string | null = null;
  private userLastName: string | null = null;
  private userProfilePic: string | null = null;
  private userRole: string | null = null; // 'admin', 'employeur', 'formateur', 'apprenant'
  private userIsSuperuser: boolean | null = null; // true ou false
  private accessToken: string | null = null; // Token d'accès
  private refreshToken: string | null = null; // Token de rafraîchissement

  constructor(private http: HttpClient) {
    this.loadSession(); // Charger les données au démarrage
  }

  // Charger les données depuis sessionStorage
  private loadSession(): void {
    const storedEmail = sessionStorage.getItem('user_email');
    if (storedEmail) {
      this.userId = sessionStorage.getItem('user_id');
      this.userEmail = storedEmail;
      this.userFirstName = sessionStorage.getItem('user_nom');
      this.userLastName = sessionStorage.getItem('user_prenom');
      this.userProfilePic = sessionStorage.getItem('user_profile_pic');
      this.userRole = sessionStorage.getItem('user_role');
      this.userIsSuperuser = sessionStorage.getItem('user_is_superuser') === 'true';
      this.accessToken = sessionStorage.getItem('access_token');
      this.refreshToken = sessionStorage.getItem('refresh_token');
    }
  }

  // Méthode de connexion
  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login/`;
    const body = { email, password };

    return this.http.post(url, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(map((response: any) => {
      // Stocker les données dans le service
      this.userId = response.id;
      this.userEmail = response.email;
      this.userFirstName = response.nom;
      this.userLastName = response.prenom;
      this.userProfilePic = response.profile_pic || null;
      this.userRole = response.role;
      this.userIsSuperuser = response.is_superuser;
      this.accessToken = response.access;
      this.refreshToken = response.refresh;

      // Stocker dans sessionStorage avec gestion des null
      sessionStorage.setItem('user_id', this.userId ?? '');
      sessionStorage.setItem('user_email', this.userEmail ?? '');
      sessionStorage.setItem('user_nom', this.userFirstName ?? '');
      sessionStorage.setItem('user_prenom', this.userLastName ?? '');
      if (this.userProfilePic) sessionStorage.setItem('user_profile_pic', this.userProfilePic);
      sessionStorage.setItem('user_role', this.userRole ?? '');
      sessionStorage.setItem('user_is_superuser', (this.userIsSuperuser ?? false).toString());
      sessionStorage.setItem('access_token', this.accessToken ?? '');
      sessionStorage.setItem('refresh_token', this.refreshToken ?? '');

      // Retourner la réponse pour le composant
      return response;
    }));
  }

  // Méthode de déconnexion
  logout(): void {
    sessionStorage.clear(); // Effacer sessionStorage
    localStorage.clear();  // Effacer localStorage pour cohérence avec le composant
    this.resetUserData();
  }

  // Réinitialiser les variables d'instance
  private resetUserData(): void {
    this.userId = null;
    this.userEmail = null;
    this.userFirstName = null;
    this.userLastName = null;
    this.userProfilePic = null;
    this.userRole = null;
    this.userIsSuperuser = null;
    this.accessToken = null;
    this.refreshToken = null;
  }

  // Obtenir les informations de l'utilisateur
  getUserInfo(): { 
    id: string | null, 
    email: string | null, 
    firstName: string | null, 
    lastName: string | null, 
    profilePic: string | null, 
    role: string | null, 
    is_superuser: boolean | null 
  } {
    return {
      id: this.userId,
      email: this.userEmail,
      firstName: this.userFirstName,
      lastName: this.userLastName,
      profilePic: this.userProfilePic,
      role: this.userRole,
      is_superuser: this.userIsSuperuser
    };
  }

  // Récupérer le token d'accès
  getAccessToken(): string | null {
    return this.accessToken || sessionStorage.getItem('access_token');
  }

  // Vérifier un rôle spécifique
  hasRole(role: string): boolean {
    return this.userRole === role;
  }

  // Vérifier si superuser
  isSuperuser(): boolean {
    return this.userIsSuperuser === true;
  }
}
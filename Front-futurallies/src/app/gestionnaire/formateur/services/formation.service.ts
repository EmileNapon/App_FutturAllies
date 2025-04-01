import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formation } from '../models/tousModel';
// import { Formation } from '../models/tousModel';
import { environment } from '../../../../../src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
 private apiUrl = environment.apiUrl;
  //private apiUrl = 'http://localhost:3000/Formations'; // Remplacer par votre API
  //private apiUrl2="http://127.0.0.1:8000/fidalli/formation/list-formations/"
  constructor(private http: HttpClient) {}

  getFormations(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/formation/list-formations/`);
  }

 
}


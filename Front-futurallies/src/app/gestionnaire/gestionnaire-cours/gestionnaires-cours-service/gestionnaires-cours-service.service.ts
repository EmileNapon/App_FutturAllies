import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GestionnairesCoursServiceService {
  private apiUrl = environment.apiUrl;
  matiereGestionnaire:string[]=[]
  //private coursUrl = 'http://127.0.0.1:8000/fidalli/cours/list_cours';
  //private adcourssUrl = 'http://127.0.0.1:8000/fidalli/cours/create';

  constructor( private http: HttpClient ) { }

  
  getCours(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cours/list_cours`);
  }

  addCours(cour: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cours/create/`, cour);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class GestionnairesCoursServiceService {
  private apiUrl = environment.apiUrl;
  matiereGestionnaire:string[]=[]

  constructor( private http: HttpClient ) { }

  
  getCours(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cours/list_cours`);
  }

  addCours(cour: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cours/create/`, cour);
  }

}

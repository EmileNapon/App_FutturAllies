import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GestionnairesModulesServiceService {

  constructor(private http:HttpClient ) { 

  } 

  private apiUrl = environment.apiUrl;

   getModule(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/modules/list_modules`);
  }

  addModule(module: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/modules/create/`, module);
  }

}

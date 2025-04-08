import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class GestionnairesModulesServiceService {

  constructor(private http:HttpClient ) { 

  } 

  private apiUrl = environment.apiUrl;
  // private modulesUrl = 'http://127.0.0.1:8000/fidalli/modules/list_modules';
   //private adModulesUrl = 'http://127.0.0.1:8000/fidalli/modules/create';

   getModule(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/modules/list_modules`);
  }

  addModule(module: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/modules/create/`, module);
  }

}

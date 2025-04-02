
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../src/environments/environment.prod';
import { BehaviorSubject } from 'rxjs';




@Injectable({
    providedIn: 'root'
  })

  export class ModuleService {



  private apiUrl = environment.apiUrl;
constructor( private http: HttpClient ) { }

  // private modulesUrl = 'http://localhost:8000/fidalli/modules/list_modules';
  


getModules(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/modules/list_modules`);
}


  }
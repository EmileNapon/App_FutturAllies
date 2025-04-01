import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Module } from '../models/tousModel';
import { environment } from '../../../../../src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  //private apiUrl = 'http://127.0.0.1:8000/fidalli/modules/list_modules'

  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl;


  getModules(): Observable<Module[]> {
    return this.http.get<Module[]>(`${this.apiUrl}/modules/list_modules`);
  }

  getModuleById(id: number): Observable<Module> {
    return this.http.get<Module>(`${this.apiUrl}/modules/list_modules/${id}`);
  }

//   addModule(module: Module): Observable<Module> {
//     return this.http.post<Module>(this.apiUrl, module);
//   }

  // Ajouter un module
  addModule(module: Module): Observable<Module> {
    return this.http.post<Module>(`${this.apiUrl}/modules/list_modules`, module);
  }

  updateModule(module: Module): Observable<Module> {
    return this.http.put<Module>(`${this.apiUrl}/modules/list_modules/${module.id}`, module);
  }

  deleteModule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/modules/list_modules/${id}`);
  }
}

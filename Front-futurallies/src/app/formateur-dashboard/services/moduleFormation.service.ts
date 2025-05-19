import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { Module, ModuleFormation } from '../models/tousModel';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class ModuleFormationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Récupérer tous les ModuleFormation
  getModuleFormations(): Observable<ModuleFormation[]> {
    return this.http.get<ModuleFormation[]>(`${this.apiUrl}/ModuleFormation/list_moduleFormation/`);
  }

  // Récupérer un ModuleFormation par son ID
  getModuleFormationById(id: number): Observable<ModuleFormation> {
    const url = `${this.apiUrl}/ModuleFormation/list_moduleFormation/${id}`;
    return this.http.get<ModuleFormation>(url);
    // return this.http.get<Module>(`${this.apiUrl}/${id}`);
  }

  // Ajouter un nouveau ModuleFormation
  addModuleFormation(moduleFormation: any[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/ModuleFormation/create/`, moduleFormation, { headers });
  }

  // Mettre à jour un ModuleFormation existant
  updateModuleFormation(moduleFormation: ModuleFormation): Observable<ModuleFormation> {
    const url = `${this.apiUrl}/ModuleFormation/list_moduleFormation/${moduleFormation.id}`;
    return this.http.put<ModuleFormation>(url, moduleFormation);
  }

  // Supprimer un ModuleFormation par son ID




  deleteModuleFormation(formationId: number, moduleId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/formations/${formationId}/modules/${moduleId}/remove/`);
  }

}

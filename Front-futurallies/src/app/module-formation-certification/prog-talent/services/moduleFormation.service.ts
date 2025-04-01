import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { Module, ModuleFormation } from '../models/tousModel';
import { environment } from '../../../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class ModuleFormationService {

  private apiUrl = environment.apiUrl;
 // private apiUrl1 = 'http://127.0.0.1:8000/fidalli/ModuleFormation/listes-module-formation'; // Remplacez par l'URL de votre API
  //private apiUrl = "http://127.0.0.1:8000/fidalli/ModuleFormation/list_moduleFormation/"

  constructor(private http: HttpClient) { }

  // Récupérer tous les ModuleFormation
  getModuleFormations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ModuleFormation/list_moduleFormation/`);
  }

  // Récupérer un ModuleFormation par son ID
  getModuleFormationById(id: number): Observable<ModuleFormation> {
    const url = `${this.apiUrl}/ModuleFormation/list_moduleFormation/${id}`;
    return this.http.get<ModuleFormation>(url);
    // return this.http.get<Module>(`${this.apiUrl}/${id}`);
  }

  // Ajouter un nouveau ModuleFormation
  addModuleFormation(moduleFormation: ModuleFormation): Observable<ModuleFormation> {
    return this.http.post<ModuleFormation>(`${this.apiUrl}/ModuleFormation/list_moduleFormation/`, moduleFormation);
  }

  // Mettre à jour un ModuleFormation existant
  updateModuleFormation(moduleFormation: ModuleFormation): Observable<ModuleFormation> {
    const url = `${this.apiUrl}/ModuleFormation/list_moduleFormation/${moduleFormation.id}`;
    return this.http.put<ModuleFormation>(url, moduleFormation);
  }

  // Supprimer un ModuleFormation par son ID
  deleteModuleFormation(id: number): Observable<void> {
    const url = `${this.apiUrl}/ModuleFormation/list_moduleFormation/${id}`;
    return this.http.delete<void>(url);
  }

  // Récupère les modules pour une formation spécifique
  // getModulesForFormation(formationId: number): Observable<Module[]> {
  //   return this.http.get<ModuleFormation[]>(`${this.apiUrl}?formation_id=${formationId}`).pipe(
  //     switchMap((moduleFormations: ModuleFormation[]) => {
  //       const moduleIds = moduleFormations.map(mf => mf.module_id);
  //       const moduleRequests = moduleIds.map(id => this.moduleService.getModuleById(id));
  //       return forkJoin(moduleRequests); 
  //     })
  //   );
  // }
}

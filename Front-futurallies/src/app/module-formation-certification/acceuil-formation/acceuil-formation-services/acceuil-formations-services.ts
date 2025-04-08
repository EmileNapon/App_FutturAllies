import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../src/environments/environment.prod';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
 
 

export class DomaineService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  
  show() { this.loadingSubject.next(true); }
  hide() { this.loadingSubject.next(false); }

  private apiUrl = environment.apiUrl;
 // private domainesUrl = 'http://localhost:8000/fidalli/domaines/list_domaines';
  private matieresUrl = 'http://localhost:9999/matieres';
  private coursUrl= "http://localhost:9999/cours";
  private cours_presentiel="http://localhost:9999/infos_cours_presentiel"

  private cours_webinaire=" http://localhost:9999/webinaires"

  
constructor( private http: HttpClient ) { }
getDomaines(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/domaines/list_domaines`);
}

getMatieres(): Observable<any[]> {
  return this.http.get<any[]>(this.matieresUrl);
}



getCours(): Observable<any[]> {
  return this.http.get<any[]>(this.coursUrl);
}

getCours_presentiel(): Observable<any[]> {
  return this.http.get<any[]>(this.cours_presentiel);
}

getWebinaire(): Observable<any[]> {
  return this.http.get<any[]>(this.cours_webinaire);
}

}
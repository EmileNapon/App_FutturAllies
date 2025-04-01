import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
  })
 
 

export class CertificationService {

  private apiUrl = environment.apiUrl;

  ListCertificat:any[]=[]

  //private ContenuCertificatUrl = 'http://127.0.0.1:8000/fidalli/certifications';
 // private CoursUseCertification = 'http://127.0.0.1:8000/fidalli/CoursUseCertification/'
  //private coursUrl= "http://localhost:8000/fidalli/cours/list_cours";
  //private chapitreUrl= "http://127.0.0.1:8000/fidalli/chapitre/list_chapitres";
  //private sectionUrl= "http://127.0.0.1:8000/fidalli/section/list_sections";
 // private baseUrlQuestios = 'http://127.0.0.1:8000/fidalli';
  
//private contenuUrl= "http://127.0.0.1:8000/fidalli/contenus/list_contenus";

  private ChapitreUrl = 'http://localhost:9999/Chapitre';
  private ArticleUrl = 'http://localhost:9999/Article';
  private VideoUrl = 'http://localhost:9999/Video';
  private PodcastUrl = 'http://localhost:9999/Podcast';
  
constructor( private http: HttpClient ) { }

getCertificat(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/certifications`);
}

getCoursUseCertification() : Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/CoursUseCertification/`); 
}


getCertificatChapitre() : Observable<any[]>{
  return this.http.get<any[]>(this.ChapitreUrl); 
}

getCertificatArticle() : Observable<any[]>{
  return this.http.get<any[]>(this.ArticleUrl); 
}

getCertificatVideo() : Observable<any[]>{
  return this.http.get<any[]>(this.VideoUrl); 
}

getCertificatPodcast() : Observable<any[]>{
  return this.http.get<any[]>(this.PodcastUrl); 
}




/////////////////////////////////////////////////////////////


getCours(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/cours/list_cours`);
}





getChapitre(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/chapitre/list_chapitres`);
}



getSection(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/section/list_sections`);

}


getContenu(): Observable<any[]> {
return this.http.get<any[]>(`${this.apiUrl}/contenus/list_contenus`);

}





getQuestion(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/questions/`);
}

getOption(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/options/`);
}

 


submitReponses(reponses: any[]): Observable <any>{
  return this.http.post(`${this.apiUrl}/reponses/`, reponses);
}

postReponses(utilisateurId: number, chapitreId: number, reponses: any[]): Observable<any> {
  const url = `${this.apiUrl}/reponses/`;
  const payload = {
    user: utilisateurId,
    chapitre: chapitreId,
    reponses: reponses
  };
  return this.http.post(url, payload);
}

}
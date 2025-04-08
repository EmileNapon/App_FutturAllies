import { filter } from 'rxjs/operators';
import { Webinar } from './../../models/webinar.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebinarService } from '../../services/webinar.service';
import { UtilisateurService } from '../../../../module-formation-certification/prog-talent/services/utilisateur.service';
import { CustomUser } from '../../../../module-formation-certification/prog-talent/models/tousModel';



@Component({
    selector: 'app-webinar-details',
    templateUrl: './webinar-details.component.html',
    styleUrls: ['./webinar-details.component.css'],
    standalone: false
})

export class WebinarDetailsComponent implements OnInit {
  webinar!: any;
  encadrants: CustomUser[] = [];
  public baseUrl = 'http://127.0.0.1:8000';
  webinarId!: string;  // Stocker l'ID du webinaire
  loading: boolean = true; // Variable pour suivre l'état de chargement

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private webinarService: WebinarService, private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    this.getWebinarDetails();
  }


  loadEncadrants(): void {
    this.utilisateurService.getFormateurs().subscribe((data) => {
      this.encadrants = data;
      console.log('ppppp',this.encadrants)
    });
  }



  webinars = [
    {
      id: 1,
      title: "Les bases de l'IA",
      theme: "Intelligence Artificielle",
      date: "23 Novembre 2024",
      time: "10:00",
      format: "Gratuit",
      image: "assets/images/ai-webinar.jpg",
    },
    {
      id: 2,
      title: "Introduction aux Systèmes Embarqués",
      theme: "Systèmes Cyber-Physiques",
      date: "25 Novembre 2024",
      time: "14:00",
      format: "Payant",
      image: "assets/images/embedded-systems.jpg",
    },
    {
      id: 3,
      title: "Optimisation des réseaux IoT",
      theme: "Internet des Objets",
      date: "28 Novembre 2024",
      time: "16:00",
      format: "Gratuit",
      image: "assets/images/iot-webinar.jpg",
    },
  ];








  getWebinarDetails(): void {
    // Récupération de l'ID depuis l'URL
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID du webinaire récupéré :', id); // Ajout pour le débogage
    if (id) {
      this.webinarId = id; // Stocker l'ID du webinaire
      this.loading = true; // Commencer le chargement
      this.webinarService.getWebinarById(id).subscribe(
        (data: Webinar) => {
          this.webinar = data;
          this.loading = false; // Les données sont chargées, arrêter le chargement
        },
        error => {
          console.error('Erreur lors de la récupération des détails du webinaire', error);
          this.loading = false; // Les données sont chargées, arrêter le chargement
        }
      );
    } else {
      console.error('Aucun ID de webinaire fourni.');
    }
  }

  register(_id:number):void{
    this.router.navigate([`/webinar-enroll/${_id}/incription`]); 
  }


  encadrantsFiltres:any

  filterLoadEncadrants():void {
    this.encadrantsFiltres=this.encadrants.filter(user=>user.id==Number(this.webinarId))
  }
}

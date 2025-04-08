import { Component } from '@angular/core';
import { Annonce } from '../models/tousModel';
import { AnnonceService } from '../services/annonce.service';
import { FormationService } from '../services/formation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-annonce',
    templateUrl: './annonce.component.html',
    styleUrls: ['./annonce.component.css'],
    standalone: false
})
export class AnnonceComponent {

  annonces: any[] = [];
  formations:any[]=[]
  formationId!:number
  filtereAnnonces:any[]=[]
  // newAnnonce: Annonce = {
  //   id: 0,
  //   titre: '',
  //   lieu: '',
  //   dateCours: new Date(),
  //   description: '',
  //   datePublication: new Date(),
  //   heure: new Date(),
  // };

  constructor(private annonceService: AnnonceService, private formationService: FormationService , router: Router, private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.loadFormations();
    this.formationId = this.route.snapshot.params['dasbordId'];
    
  }


  loadFormations(): void {
    this.formationService.getFormations().subscribe(
      (data) => { 
        this.formations = data;  
       
       this.loadAnnonces()
       
      }
    );
  } 


    // Charger les annonces à partir du service
    loadAnnonces(): void {
      this.annonceService.getAnnonces().subscribe(data => {
        this.annonces = data;
        this.filtereAnnonces= this.annonces.filter(annon => annon.formation==this.formationId);
       
      });
    }

  // Ajouter une nouvelle annonce
  // ajouterAnnonce(): void {
  //   this.annonceService.addAnnonce(this.newAnnonce).subscribe(annonce => {
  //     this.annonces.push(annonce);
  //   });
  // }

  // Supprimer une annonce
  supprimerAnnonce(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      this.annonceService.deleteAnnonce(id).subscribe(() =>  {
        this.loadAnnonces();
      });
      
    }
  }
 

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Module, Seance } from '../../models/tousModel';
import { SeanceService } from '../../services/seance.service';
import { ModuleService } from '../../services/module.service';
import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
    selector: 'app-ajout-seance',
    templateUrl: './ajout-seance.component.html',
    styleUrls: ['./ajout-seance.component.css'],
    standalone: false
})
export class AjoutSeanceComponent {
  seanceForm!: FormGroup;  
  module!: any;
  modules: Module[] = [];  // Stockage des modules récupérés
  formationId!: number
  public baseUrl = 'http://127.0.0.1:8000'
  constructor(
    private fb: FormBuilder,  
    private seanceService: SeanceService,
    private moduleService: ModuleService,  
    private route: ActivatedRoute,
    private router: Router  ,
    private utilisateurService: UtilisateurService,
  ) {
    // Initialisation du formulaire réactif




  }

c:any
  dasbordId:any
  ngOnInit(): void {
    this.module = Number(this.route.snapshot.params['seanceId']);
    this.formationId = Number(this.route.snapshot.params['id_joutFormation']);

    this.c=this.dasbordId
    this.x()
    this.seanceForm.patchValue({ module: this.module });  // Assigne l'ID du module

    // Récupérer les modules disponibles
    this.moduleService.getModules().subscribe(modules => {
    this.modules = modules;
    });
    this.loadFormateurs()
  
  }






  encadrants:any[]=[]
// Charger les formateurs (utilisateurs avec rôle 'encadrant')
loadFormateurs(): void {
  this.utilisateurService.getFormateurs().subscribe(
    (data) => {
      this.encadrants = data;
      console.log('ooooooooooooooooo',this.encadrants)
    },
    (error) => {
      console.error('Erreur lors du chargement des formateurs:', error);
    }
  );
}
 




  
selectedEncadrant: any[] = [];

selectedFormateurs: { formation: number, user: number }[] = [];

  formation: number |null=null


        // Gestion de la sélection des modules
        onEncadrantSelectionChange(encadrantId: number, event: any): void {
          if (event.target.checked) {
            // Ajouter le module à la sélection s'il n'existe pas déjà
            if (!this.selectedFormateurs.some(selected => selected.user === encadrantId)) {
              this.selectedFormateurs.push({formation:this.formationId,user:encadrantId });  
            }
          } else {
            // Retirer le module de la sélection si la case est décochée
            this.selectedFormateurs = this.selectedFormateurs.filter(selected => selected.user !== encadrantId);
            // Récupérer la liste de tous les utilisateurs sélectionnés
          }
          const utilisateurs = this.selectedFormateurs.map(formateur => formateur.user);

          // Mettre à jour la valeur du champ 'user' dans le formulaire existant
          this.seanceForm.patchValue({
            user: utilisateurs
          });
        }
        


        x():void{
          this.seanceForm = this.fb.group({
            formation: this.formationId,
            module: this.module,
            lieu: ['', [Validators.required]],  
            date_formation: ['', [Validators.required]], 
            heure_debut: ['', [Validators.required]],  // Champ "heure de début"
            heure_fin: ['', [Validators.required]],  // Champ "heure de fin"
            statut: ['attente'],  // Valeur par défaut pour le statut
            user:null
            });
        
        }

        addSeance(): void {

          console.log('//////////////',this.seanceForm.value)
          if (this.seanceForm.valid) {
            this.seanceService.addSeance(this.seanceForm.value).subscribe(() => {
              this.router.navigate([`/admin/dasbord/${this.formationId}/dasbord-prog-talent`]); 
      
             
            });
          }
        }
}

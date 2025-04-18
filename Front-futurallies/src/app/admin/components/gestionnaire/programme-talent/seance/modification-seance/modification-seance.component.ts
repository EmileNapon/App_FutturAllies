import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Module, Seance } from '../../models/tousModel';
import { SeanceService } from '../../services/seance.service';
import { ModuleService } from '../../services/module.service';
import { UtilisateurService } from '../../services/utilisateur.service';


@Component({
    selector: 'app-modification-seance',
    templateUrl: './modification-seance.component.html',
    styleUrls: ['./modification-seance.component.css'],
    standalone: false
})
export class ModificationSeanceComponent implements OnInit{

  seanceForm: FormGroup;
  seanceUserForm!: FormGroup;
  seanceId!: number;
  modules: Module[] = [];  // Stockage des modules récupérés
  dasbordId!: string |null
  encadrantsFiltres:any[]=[]
  seanceUsers: any[]=[]
  module!:number
  formationId!:number


  selectedEncadrant: any[] = [];

  selectedFormateurs: { formation: number, user: number }[] = [];

  formation: number |null=null

  
  constructor(
    private fb: FormBuilder,  
    private seanceService: SeanceService,
    private moduleService: ModuleService,  
    private route: ActivatedRoute,
    private router: Router ,
    private utilisateurService: UtilisateurService 
  ) {
    // Initialisation du formulaire réactif
    // this.seanceForm = this.fb.group({
    //   lieu: ['', [Validators.required]],  
    //   date_formation: ['', [Validators.required]], 
    //   heure_debut: ['', [Validators.required]], 
    //   heure_fin: ['', [Validators.required]],  
    //   statut: ['', [Validators.required]],  
    //   moduleFormation_id: [null, [Validators.required]]  
    // });
    this.seanceForm = this.fb.group({
      lieu: ['', [Validators.required]],  
      date_formation: ['', [Validators.required]], 
      heure_debut: ['', [Validators.required]],  // Champ "heure de début"
      heure_fin: ['', [Validators.required]],  // Champ "heure de fin"
      statut: ['', [Validators.required]],  // Valeur par défaut pour le statut
      module: null,
      user:[[]],

    });
  }

  ngOnInit(): void {
    // this.moduleId = +this.route.snapshot.paramMap.get('id'); // Récupérer l'ID du module à partir de l'URL
    this.seanceId = this.route.snapshot.params['id'];
    this.dasbordId = this.route.snapshot.paramMap.get('dasbordId');
    this.loadSeance(); // Charger les données du module
    // this.moduleForm.patchValue({ formation_id: 1 });  
    // this.moduleForm.patchValue({formation_id: 2});
    this.module = Number(this.route.snapshot.params['seanceId']);
    this.formationId = Number(this.route.snapshot.params['id_joutFormation']);
    // Récupérer les modules disponibles
    this.moduleService.getModules().subscribe(modules => {
      this.modules = modules;
    });

    this.loadseances()
  }

  loadSeance(): void {
    this.seanceService.getSeanceById(this.seanceId).subscribe((seance: any) => {
      console.log('Données de la séance récupérées :', seance);
      this.seanceForm.patchValue({
        lieu: seance.lieu,
        date_formation: seance.date_formation,
        heure_debut: seance.heure_debut,
        heure_fin: seance.heure_fin,
        statut: seance.statut,
        module: seance.module,
        user: seance.customuser
        
      });
      this.seanceUsers =seance.user
      console.log('Données de la séance récupérées :', this.seanceUsers);
      this.loadFormateurs();  
  
 
    });
  }

  encadrants:any[]=[]
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
        


  updateSeance(): void {
    console.log('888888888888',this.seanceForm.value)
    if (this.seanceForm.valid) {

      const updatedModule: Seance = { id: this.seanceId, ...this.seanceForm.value };
      this.seanceService.updateSeance(updatedModule).subscribe(() => {

        this.router.navigate([`/admin/formation`]); // Redirection après modification du module

      });
    }
  }

  seances:any[]=[]
  loadseances(): void {
    this.seanceService.getSeances().subscribe(
      (data) => {
        this.seances = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des modules:', error);
      }
    );
  }


  onSelectProgrammeTalent(DasbordFormationId: number): void {

    this.router.navigate([`/admin/dasbord/${DasbordFormationId}/dasbord-prog-talent`]); 

  }
}
